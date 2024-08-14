import { createClient } from '@/supabase/server';

export const uploadPostImageToStorage = async (file: File) => {
  const supabase = createClient();

  const fileNewName = `${crypto.randomUUID()}.${file.name.split('.').pop()}`;
  const { data, error } = await supabase.storage
    .from('posts')
    .upload(`quill_image/${fileNewName}`, file);

  if (error) {
    console.error('이미지 업로드 중 오류 발생:', error.message);
    return { error };
  }

  const { publicUrl } = supabase.storage
    .from('posts')
    .getPublicUrl(`quill_image/${fileNewName}`).data;

  if (publicUrl) {
    return { url: publicUrl };
  } else {
    console.error('No public URL found in response data.');
    return { error: 'No public URL found' };
  }
};
