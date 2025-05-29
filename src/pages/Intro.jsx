import Button from '@/components/commons/Button';

const Intro = () => {
  return (
    <main className="h-screen bg-[url(assets/images/intro.png)] bg-cover bg-center">
      <div className="fixed top-2/3 right-1/2 translate-x-1/2">
        <Button buttonText="START" textSize="36px" padding="20px" />
      </div>
    </main>
  );
};

export default Intro;
