import axios from 'axios';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { toast } from 'react-hot-toast';

interface DropzoneProps {
  onChange: (base64: string, fileKey: string) => void;
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
  const { data: session } = useSession();

  const handleChange = useCallback(
    async (base64: string, file: File) => {
      try {
        onChange(
          base64,
          `api/users/${session?.user?.email}/media/${file?.name}`
        );
        const signedUrlResponse = await axios.post('/api/uploadkey', {
          body: file,
          key: `api/users/${session?.user?.email}/media/${file?.name}`,
        });

        await axios.put(signedUrlResponse.data, file);
      } catch (error) {
        toast.error('Upload image failed!');
      }
    },
    [onChange, session?.user?.email]
  );

  const handleDrop = useCallback(
    (files: any) => {
      const file = files[0];
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
