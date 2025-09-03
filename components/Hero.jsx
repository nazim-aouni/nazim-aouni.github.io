import '../App.css';

function Hero() {
  return (
    <section className="flex flex-col md:flex-row items-center justify-center gap-10 p-8 bg-slate-900 text-white min-h-[80vh]">
      
      <img
        src="/R.png" 
        alt="Your Name"
        className="w-40 h-40 rounded-full object-cover shadow-lg"
      />


      <div className="text-center md:text-left max-w-xl">
        <h1 className="text-4xl font-bold mb-2">Hi, I'm Nazim 👋</h1>
        <p className="text-lg text-slate-300">
          I'm a full-stack developer with a passion for building beautiful and secure web apps.
        </p>
        <div className="mt-4 flex justify-center md:justify-start gap-4">
          <a
            href="#projects"
            className="bg-sky-500 hover:bg-sky-600 text-white px-4 py-2 rounded"
          >
            View Projects
          </a>
          <a
            href="#contact"
            className="border border-sky-500 hover:bg-sky-500 hover:text-white px-4 py-2 rounded"
          >
            Contact Me
          </a>
        </div>
      </div>
    </section>
  );
}

export default Hero;
