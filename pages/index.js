import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import styles from "../styles/Home.module.css";

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Homepage</title>
        <meta name="description" content="Matts homepage" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <style jsx>{`
        .link {
          text-decoration: none;
          color: black;
          cursor: pointer;
        }
        .link:hover {
          text-decoration: underline;
        }
        .items-start {
          line-height: 1.6;
        }
      `}</style>
      <div className="container max-w-3xl mx-auto">
        <div className="grid grid-cols-3 sm:grid-cols-4 gap-2 px-2 py-8">
          {/* grid item */}
          <div className="flex flex-col bg-white/70 backdrop-blur-lg p-3 rounded-md">
            <div className="text-center mb-2 text-lg font-bold">School</div>
            <div className="flex flex-col items-start text-sm">
              <Link href="https://mysnhu.force.com/mysnhu/s/">
                <div className="link">mySNHU</div>
              </Link>
              <Link href="https://sso-mail.snhu.edu/owa">
                <div className="link">SNHU Webmail</div>
              </Link>
              <Link href="https://learn.snhu.edu/d2l/home/1071736">
                <div className="link">DAT-375</div>
              </Link>
              <Link href="https://learn.snhu.edu/d2l/home/1067966">
                <div className="link">IT-226</div>
              </Link>
            </div>
          </div>
          {/* grid item */}
          <div className="flex flex-col bg-white/70 backdrop-blur-lg p-3 rounded-md">
            <div className="text-center mb-2 text-lg font-bold">Tools</div>
            <div className="flex flex-col items-start text-sm">
              <Link href="https://docs.google.com/">
                <div className="link">Google Docs</div>
              </Link>
              <Link href="https://getcssscan.com/css-box-shadow-examples">
                <div className="link">Box Shadows</div>
              </Link>
              <Link href="https://app.diagrams.net/">
                <div className="link">Diagram Maker</div>
              </Link>

              <Link href="https://uigradients.com">
                <div className="link">uiGradients</div>
              </Link>
            </div>
          </div>
          {/* grid item */}
          <div className="flex flex-col bg-white/70 backdrop-blur-lg p-3 rounded-md">
            <div className="text-center mb-2 text-lg font-bold">Money</div>
            <div className="flex flex-col items-start text-sm">
              <Link href="https://www.santander.com/en/home">
                <div className="link">Santander</div>
              </Link>
              <Link href="https://www.capitalone.com/">
                <div className="link">Capital One</div>
              </Link>
              <Link href="https://www.chase.com/">
                <div className="link">Chase</div>
              </Link>
            </div>
          </div>
          {/* grid item */}
          <div className="flex flex-col bg-white/70 backdrop-blur-lg p-3 rounded-md">
            <div className="text-center mb-2 text-lg font-bold">Bills</div>
            <div className="flex flex-col items-start text-sm">
              <Link href="https://faxoncommonsapts.securecafe.com/residentservices/faxon-commons/userlogin.aspx">
                <div className="link">Faxon Commons</div>
              </Link>
              <Link href="https://www.nationalgridus.com/MA-Home/default?regionkey=masselec&customertype=home">
                <div className="link">National Grid</div>
              </Link>
              <Link href="https://www.progressive.com/">
                <div className="link">Progressive</div>
              </Link>
            </div>
          </div>
          {/* grid item */}
          <div className="flex flex-col bg-white/70 backdrop-blur-lg p-3 rounded-md">
            <div className="text-center mb-2 text-lg font-bold">Social</div>
            <div className="flex flex-col items-start text-sm">
              <Link href="https://banned-social2.vercel.app/">
                <div className="link">Banned Social</div>
              </Link>
              <Link href="https://instagram.com/">
                <div className="link">Instagram</div>
              </Link>
              <Link href="https://facebook.com/">
                <div className="link">Facebook</div>
              </Link>
            </div>
          </div>
          {/* grid item */}
          <div className="flex flex-col bg-white/70 backdrop-blur-lg p-3 rounded-md">
            <div className="text-center mb-2 text-lg font-bold">News</div>
            <div className="flex flex-col items-start text-sm truncate">
              <Link href="https://boards.4chan.org/pol/">
                <div className="link">4chan</div>
              </Link>
              <Link href="https://www.infowars.com/">
                <div className="link">Infowars</div>
              </Link>
              <Link href="https://www.washingtonexaminer.com/">
                <div className="link">Washington Examiner</div>
              </Link>
              <Link href="https://www.yahoo.com">
                <div className="link">Yahoo</div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
