import Application from '@ioc:Adonis/Core/Application';
import Drive from '@ioc:Adonis/Core/Drive';
import Env from '@ioc:Adonis/Core/Env';
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import User from 'App/Models/User';
import fs from 'fs';
import sharp from 'sharp';

export default class ProfilesController {
    public async putProfileImage({ response, request }: HttpContextContract) {
        const profilePicture = request.file('profilePicture', {
            size: '12mb',
            extnames: ['jpg', 'png', 'gif', 'jpeg'],
        });

        let uploadedUrl = '';
        const imagePath = 'profile_pictures/';
        const __storeDir = Application.tmpPath(`uploads/${imagePath}`);

        if (!profilePicture) {
            return response.json('No file selected');
        }

        if (!profilePicture.isValid) {
            return profilePicture.errors;
        }

        try {
            await profilePicture.moveToDisk(imagePath);
            const __resizeDir = `${__storeDir}resize/`;

            if (!fs.existsSync(__resizeDir)) {
                fs.mkdirSync(__resizeDir);
            }

            await sharp(profilePicture.filePath)
                .resize({
                    fit: sharp.fit.contain,
                    width: 200,
                })
                .png({ quality: 80 })
                .toFile(`${__resizeDir}/${profilePicture.fileName}`);

            uploadedUrl = `${Env.get('BASE_URL')}:${Env.get('PORT')}/uploads/${imagePath}resize/${
                profilePicture.fileName
            }`;

            const user = await User.findOrFail(request.input('userId'));

            if (user?.avatar) {
                const existingFileName = user?.avatar.replace(/^.*[\\\/]/, '');

                if (!fs.existsSync(`${imagePath}resize/${existingFileName}`)) {
                    await Drive.delete(`${imagePath}resize/${existingFileName}`);
                }
            }

            user.avatar = uploadedUrl;
            await user.save();
        } catch (error) {
            console.log(`An error occurred during processing: ${error}`);
        }

        if (profilePicture?.filePath) {
            await Drive.delete(`${imagePath}${profilePicture.fileName}`);
        }

        const res = {
            fileName: profilePicture?.fileName,
            type: profilePicture?.type,
            avatar: uploadedUrl,
        };

        return response.json(res);
    }
}
