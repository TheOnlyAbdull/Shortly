import logo from "./assets/images/logo.svg";
import logoW from "./assets/images/logo-white.svg";
import illustration from "./assets/images/illustration-working.svg";
import brandR from "./assets/images/icon-brand-recognition.svg";
import fullyC from "./assets/images/icon-fully-customizable.svg";
import detailedR from "./assets/images/icon-detailed-records.svg";
import faceBook from "./assets/images/icon-facebook.svg";
import twitter from "./assets/images/icon-twitter.svg";
import Pintrest from "./assets/images/icon-pinterest.svg";
import instagram from "./assets/images/icon-instagram.svg";
import { useEffect, useState } from "react";

export default function App() {
  return (
    <div className="App">
      <Header />
      <Hero />
      <ShortenLink />
      <GetStarted />
      <Footer />
      <div className="author">
        <p>Made by Abdullahi Salaudeen❤️</p>
      </div>
    </div>
  );
}

function Header() {
  const [isActive, setIsActive] = useState(false);
  return (
    <header>
      <div className="logo">
        <img src={logo} alt="shortly" />
      </div>
      <nav className={isActive ? "active-nav" : ""}>
        <ul>
          <li>Features</li>
          <li>Pricing</li>
          <li>Resources</li>
        </ul>
        <div className="auth">
          <div className="login">Login</div>
          <div className="sign-up">Sign Up</div>
        </div>
      </nav>
      <div
        className={`menu ${isActive ? "active" : ""}`}
        onClick={() => setIsActive((active) => !active)}
      >
        <div className="line"></div>
        <div className="line"></div>
        <div className="line"></div>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section className="sec-1">
      <div className="row hero-sec">
        <div className="col-6 hero-text">
          <h1 className="hero-h1">More than just shorter links</h1>
          <p className="hero-p">
            Build your brand’s recognition and get detailed insights on how your
            links are performing.
          </p>
          <span className="hero-btn">Get Started</span>
        </div>
        <div className="col-6 hero-img">
          <img src={illustration} alt="illustration" />
        </div>
      </div>
    </section>
  );
}

function ShortenLink() {
  const [links, setLinks] = useState(function () {
    const storedValue = localStorage.getItem("link");
    const approved = storedValue ? JSON.parse(storedValue) : [];
    return approved;
  });

  useEffect(
    function () {
      localStorage.setItem("link", JSON.stringify(links));
    },
    [links]
  );
  return (
    <main className="sec-2">
      <Form setLinks={setLinks} />
      <Links links={links} setLinks={setLinks} />
      <Stat />
    </main>
  );
}

function Form({ setLinks }) {
  // `https://api.shrtco.de/v2/shorten?url=${submittedUrl}`
  const [longUrl, setLongUrl] = useState("");
  const [submittedUrl, setSubmittedUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [errMsg, setErrMsg] = useState(false);

  function handleGetUrl(e) {
    e.preventDefault();
    if (longUrl.length > 3) {
      setSubmittedUrl(longUrl);
    }
  }

  useEffect(
    function () {
      async function shortenUrl() {
        try {
          setIsLoading(true);
          const res = await fetch(
            `https://api.shrtco.de/v2/shorten?url=${submittedUrl}`
          );
          if (!res.ok) {
            throw new Error("Enter a valid URL");
          }
          const data = await res.json();
          console.log(data);
          //create new list
          const li = {
            url: submittedUrl,
            shortUrl: data.result.full_short_link,
            id: data.result.code,
          };
          setLinks((link) => [li, ...link]);
          setErrorMessage(null);
        } catch (err) {
          setErrorMessage(err.message);
          //set and reset error msg after 3seconds
          setErrMsg(true);
          setTimeout(() => {
            setErrMsg(false);
          }, 3000);
        } finally {
          setIsLoading(false);
          setLongUrl("");
          setSubmittedUrl("");
        }
      }
      if (submittedUrl.length > 3) shortenUrl();
    },
    [submittedUrl]
  );

  return (
    <div className="form-sec">
      <form onSubmit={handleGetUrl}>
        <input
          value={longUrl}
          onChange={(e) => setLongUrl(e.target.value)}
          placeholder="Shorten a link here..."
          disabled={isLoading}
        />
        <button>Shorten It!</button>
        {errMsg && (
          <p className="form-p">
            <i>{errorMessage}</i>
          </p>
        )}
      </form>
    </div>
  );
}

function Links({ links, setLinks }) {
  function handleCopy(url) {
    //copy text to clipboard
    navigator.clipboard.writeText(url);
  }
  function handleDelete(id) {
    setLinks((link) => link.filter((li) => li.id !== id));
  }
  return (
    <div className="links">
      <ul>
        {links.map((link) => (
          <li key={link.id}>
            <span className="link">{link.url}</span>
            <span>
              <span className="shorten">{link.shortUrl}</span>
              <span className="copy" onClick={() => handleCopy(link.shortUrl)}>
                copy
              </span>
              <span className="del" onClick={() => handleDelete(link.id)}>
                ❌
              </span>
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function Stat() {
  return (
    <div className="stat">
      <div className="stat-text">
        <h2 className="stat-h2">Advanced Statistics</h2>
        <p className="stat-p">
          Track how your links are performing across the web with our advanced
          statistics dashboard.
        </p>
      </div>

      <div className="row stat-illus">
        <div className="col-4">
          <div className="stat-1">
            <div className="stat-img">
              <img src={brandR} alt="brand" />
            </div>
            <h3 className="stat-h3">Brand Recognition</h3>
            <p className="stat-img-p">
              Boost your brand recognition with each click. Generic links don’t
              mean a thing. Branded links help instil confidence in your
              content.
            </p>
          </div>
        </div>

        <div className="col-4">
          <div className="stat-2">
            <div className="stat-img">
              <img src={detailedR} alt="detailed" />
            </div>
            <h3 className="stat-h3">Detailed Records</h3>
            <p className="stat-img-p">
              Gain insights into who is clicking your links. Knowing when and
              where people engage with your content helps inform better
              decisions.
            </p>
          </div>
        </div>

        <div className="col-4">
          <div className="stat-3">
            <div className="stat-img">
              <img src={fullyC} alt="fully" />
            </div>
            <h3 className="stat-h3">Fully Customizable</h3>
            <p className="stat-img-p">
              Improve brand awareness and content discoverability through
              customizable links, supercharging audience engagement.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function GetStarted() {
  return (
    <section className="sec-3">
      <div>
        <p>Boost your links today</p>
        <span className="hero-btn">Get Started</span>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer>
      <div className="row foot-sec">
        <div className="col-4 f-logo">
          <img src={logoW} alt="Shortly" />
        </div>
        <div className="col-2">
          <p>Features</p>
          <ul>
            <li>Link</li>
            <li>Shortening</li>
            <li>Branded</li>
            <li>Analytics</li>
          </ul>
        </div>
        <div className="col-2">
          <p>Resources</p>
          <ul>
            <li>Blog</li>
            <li>Developers</li>
            <li>Support</li>
          </ul>
        </div>
        <div className="col-2">
          <p>Company</p>
          <ul>
            <li>About</li>
            <li>Our Team</li>
            <li>Careers</li>
            <li>Contact</li>
          </ul>
        </div>
        <div className="col-2">
          <p className="icons">
            <span>
              <img src={faceBook} alt="FB" />
            </span>
            <span>
              <img src={twitter} alt="X" />
            </span>
            <span>
              <img src={Pintrest} alt="PN" />
            </span>
            <span>
              <img src={instagram} alt="IG" />
            </span>
          </p>
        </div>
      </div>
    </footer>
  );
}
