import classNames from "classnames";
import { Loading } from "components/shared";
import { Upload } from "components/ui";
import { useState } from "react";
import { imageToBase64, resizeImage } from "utils/image";
import UserImage from "./UserImage";

export default function AvatarUpload({ value, onChange: onChangeProp, size = 120 }) {
  const [loading, setLoading] = useState(false);
  const onChange = async(value) => {
    setLoading(true);
    const image = value[0];
    const resizedImage = await resizeImage({
      image,
      format: 'image/webp',
    });

    await imageToBase64(resizedImage, (result) => {
      onChangeProp(result);
    });
    setLoading(false);
  }

  return (
    <div>
      <Upload
        accept='image/*'
        className={classNames('cursor-pointer', { 'cursor-wait': loading })}
        showList={false}
        uploadLimit={1}
        onChange={onChange}
        disabled={loading}
      >
      <Loading loading={loading} type='cover'>
        <UserImage
          className='border-2 border-white dark:border-gray-800 shadow-md hover:shadow-lg'
          src={value}
          size={size}
        />
      </Loading>
      </Upload>
    </div>
  )
}
