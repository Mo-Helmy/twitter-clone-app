import Image from 'next/image';
import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';

interface DropzoneProps {
  onChange: (base64: string, file: File) => void;
  label: string;
  value?: string;
  disabled?: boolean;
}

const ImageUpload: React.FC<DropzoneProps> = ({
  onChange,
  label,
  value,
  disabled,
}) => {
  const [base64, setBase64] = useState(value);

  const handleChange = useCallback(
    (base64: string, file: File) => {
      onChange(base64, file);
    },
    [onChange]
  );

  const handleDrop = useCallback(
    (files: any) => {
      const file = files[0];
      console.log('🚀 ~ file: ImageUpload.tsx:30 ~ file:', file);
      const reader = new FileReader();
      reader.onload = (event: any) => {
        setBase64(event.target.result);
        handleChange(event.target.result, file);
      };
      reader.readAsDataURL(file);
    },
    [handleChange]
  );

  const { getRootProps, getInputProps } = useDropzone({
    maxFiles: 1,
    onDrop: handleDrop,
    disabled,
    accept: {
      'image/jpeg': [],
      'image/png': [],
    },
  });

  return (
    <div
      {...getRootProps({
        className:
          'w-full p-4 text-white text-center border-2 border-dotted rounded-md border-neutral-700',
      })}
    >
      <input {...getInputProps()} />
      {base64 ? (
        <div className="flex items-center justify-center">
          <Image src={base64} height="100" width="100" alt="Uploaded image" />
        </div>
      ) : (
        <p className="text-white">{label}</p>
      )}
    </div>
  );
};

export default ImageUpload;
