import React, { useEffect, useState } from 'react';
import { useUploadImageMutation } from '../../features/user/userApi';
import useGetAuthUser from '../../hooks/useGetAuthUser';

export default function ProfileImage() {
    const [image, setImage] = useState(null);
    const [imageUrl, setImageUrl] = useState('');
    const { avatar, name, email } = useGetAuthUser();
    const [uploadImage, { isLoading, isSuccess, isError }] = useUploadImageMutation();

    useEffect(() => {
        if (image) {
            setImageUrl(URL.createObjectURL(image));
        } else if (avatar) {
            setImageUrl(avatar);
        }
    }, [image, avatar]);

    const onImageSelected = (e) => {
        e.preventDefault();

        if (e.target.files[0]) {
            setImage(e.target.files[0]);
            const formData = new FormData();
            formData.append('profilePicture', e.target.files[0]);
            uploadImage(formData);
        }
    };

    return (
        <div className="w-full flex flex-col items-center justify-center">
            <div className="flex flex-col mt-6 p-2">
                <div className="flex flex-row items-center justify-center">
                    <div className="flex relative">
                        {imageUrl ? (
                            <img
                                className="w-[95px] h-[95px] object-fill rounded-full ring-1 ring-gray-300 ring-offset-1"
                                src={imageUrl}
                                alt=""
                            />
                        ) : (
                            <i className="fa fa-user-circle text-[90px] text-gray-300" />
                        )}

                        {isLoading && (
                            <svg
                                className="absolute top-8 -left-3 animate-spin h-5 w-5 mr-3"
                                width="48"
                                height="48"
                                viewBox="0 0 48 48"
                            >
                                <g fill="none">
                                    <path
                                        id="track"
                                        fill="#C6CCD2"
                                        d="M24,48 C10.745166,48 0,37.254834 0,24 C0,10.745166 10.745166,0 24,0 C37.254834,0 48,10.745166 48,24 C48,37.254834 37.254834,48 24,48 Z M24,44 C35.045695,44 44,35.045695 44,24 C44,12.954305 35.045695,4 24,4 C12.954305,4 4,12.954305 4,24 C4,35.045695 12.954305,44 24,44 Z"
                                    />
                                    <path
                                        id="section"
                                        fill="#0d9f26"
                                        d="M24,0 C37.254834,0 48,10.745166 48,24 L44,24 C44,12.954305 35.045695,4 24,4 L24,0 Z"
                                    />
                                </g>
                            </svg>
                        )}

                        {!isLoading && isSuccess && (
                            <svg
                                className="absolute top-8 -left-3 h-5 w-5 mr-3"
                                width="48"
                                height="48"
                                viewBox="0 0 16 16"
                            >
                                <path
                                    fill="#0d9f26"
                                    d="M2.5 8a5.5 5.5 0 0 1 8.25-4.764.5.5 0 0 0 .5-.866A6.5 6.5 0 1 0 14.5 8a.5.5 0 0 0-1 0 5.5 5.5 0 1 1-11 0z"
                                />
                                <path
                                    fill="#0d9f26"
                                    d="M15.354 3.354a.5.5 0 0 0-.708-.708L8 9.293 5.354 6.646a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0l7-7z"
                                />
                            </svg>
                        )}

                        {!isLoading && isError && (
                            <svg
                                className="absolute top-8 -left-3 h-5 w-5 mr-3"
                                width="48"
                                height="48"
                                fill="currentColor"
                                viewBox="0 0 16 16"
                            >
                                <path
                                    fill="#94000a"
                                    d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"
                                />
                                <path
                                    fill="#94000a"
                                    d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"
                                />
                            </svg>
                        )}
                    </div>

                    <div className="px-2 py-1">
                        <label className="items-center px-2 py-1 bg-gray-200 text-gray-900 text-sm font-medium rounded-full border border-blue cursor-pointer hover:bg-gray-300">
                            <span className="">Choose File</span>
                            <input type="file" onChange={onImageSelected} className="hidden" />
                        </label>
                    </div>
                </div>
                <div className="text-xl text-semibold text-gray-900">{name}</div>
                <div className="flex items-center space-x-1">
                    <i className="fa-regular fa-envelope text-sm text-gray-900" />
                    <span className="text-md text-gray-900">{email}</span>
                </div>
            </div>
        </div>
    );
}
