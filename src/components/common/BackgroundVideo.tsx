export default function BackgroundVideo() {
  return (
    <div className='fixed top-0 left-0 w-full h-full -z-10 opacity-25'>
      <video src='/videos/backgroundVideo.mp4' autoPlay loop muted></video>
    </div>
  );
}
