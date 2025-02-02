import Head from "next/head";

const Resume = () => {
  return (
    <div className="container">
      <Head>
        <title>Resume</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <section>
          <div>
            <h1 className="title">
              Senior Software Engineer -{" "}
              <a href="https://www.nytimes.com/wirecutter/">
                The New York Times, Wirecutter
              </a>
            </h1>
            <div className="date">
              <b>Software Engineer</b>: 10/20 - 01/22
            </div>
            <div className="date">
              <b>Senior Software Engineer</b>: 01/22 - Present
            </div>
            <p className="description indent">
              As an engineer on the Reader Growth team I focus on features
              related to growing our audience including SEO optimizations,
              improving Core Web Vitals, off-platform presence (newsletters and
              Apple News), and integrating with services that NYT teams provide.
              Some projects that I acted as tech lead on include:
            </p>
            <ul>
              <li>
                • A service that publishes all Wirecutter content to The New
                York Times publishing pipeline
              </li>
              <li>
                • The data and api migration of newsletter subscription services
              </li>
              <li>
                • A feature called Live Blog Posts that has resulted in
                Wirecutter articles getting top prioritization in Google News
                feeds during major deal events
              </li>
              <li>
                • A brand new interactive article type called{" "}
                <a href="https://www.nytimes.com/wirecutter/product-finder/coffee">
                  Product Finder
                </a>
              </li>
              <li>
                • Building a custom pipeline that transforms and publishes
                Wirecutter content to Apple News
              </li>
            </ul>
            <div className="footnote">
              <code>
                • Javascript, React, Node, GraphQL, NextJS, Python, PHP,
                Wordpress, AWS, GCP, CircleCI, Docker
              </code>
            </div>
            <hr />
            <h1 className="title">
              Full Stack Developer -{" "}
              <a href="https://gfs.com/en-us/"> Gordon Food Service</a>
            </h1>
            <span className="date">02/19 - 10/20</span>
            <p className="description indent">
              Develop and maintain a suite of customer-facing applications known
              as <a href="https://gordonnow.com/">Gordon Now</a> that automate
              customer support duties, provide information and ordering options,
              and enhance the customer experience while working in an Agile
              setting. These applications are in the form of a mobile app (iOS &
              Android), a Google Voice Assistant, and a chatbot that is embedded
              and tailored to various internal and customer-facing sites. I also
              helped design and build out the CI/CD processes that enforce code
              quality and automate deployments.
            </p>
            <h1 className="title">
              Web Developer (as a contractor) -{" "}
              <a href="https://gfs.com/en-us/">Gordon Food Service</a>
            </h1>
            <span className="date">06/18 - 02/19</span>
            <p className="description indent">
              Collaborated with many teams on a variety of projects in the
              marketing technology department. Notable projects include building
              multiple ETL processes that gather customer data from siloed
              sources which are then unified in Salesforce to power targeted
              digital marketing efforts, and scaling an internal ad server to
              support internationalized ads for Canadian customers.
            </p>
            <div className="footnote">
              <code>
                • Javascript, React, React Native, Redux, Redux-Saga, Expo,
                Angular, Python, Java, Kotlin, Spring Boot, PHP, Drupal 8,
                Wordpress, Google Cloud Platform, Kubernetes, Helm, Docker,
                Jenkins, MySQL
              </code>
            </div>
            <hr />
            <h1 className="title">
              Web Developer -{" "}
              <a href="https://onestopinc.com/">One Stop Inc.</a>
            </h1>
            <span className="date">11/16 - 06/18</span>
            <p className="description indent">
              Maintained and added features to a legacy B2B e-commerce site that
              handled ~80% of all sales. Lead the development of a complete
              redesign of the UI, and rearchitected the front end and middleware
              applications away from a deprecated framework and onto a modern
              tech stack. Also, set up load balancing and replication for the
              existing database, and ported the entire development environment
              from virtual machines to Docker containers.
            </p>
            <div className="footnote">
              <code>
                • Javascript, Typescript, React, MobX, Vue, Node, Express,
                jQuery, PHP, Python Django, Postgres, MongoDB, Vagrant, Docker{" "}
              </code>
            </div>
            <hr />
            <h1 className="title">Education</h1>
            <div className="date">08/09 - 05/13</div>
            <p>
              <strong className="description">
                Central Michigan University - Mount Pleasant, MI
              </strong>
            </p>
            <em className="description">
              Bachelor of Applied Arts in 2-D Design; Philosophy Minor
            </em>
          </div>
        </section>
      </main>
      <style jsx>{`
        code {
          border-radius: 5px;
          padding: 0.75rem;
          font-size: var(--text-very-small);
          color: var(--dark);
          font-family: Menlo, Monaco, Lucida Console, Liberation Mono,
            DejaVu Sans Mono, Bitstream Vera Sans Mono, Courier New, monospace;
        }
        hr {
          margin: 2rem 0.5rem;
          border: 1px solid var(--medium);
        }
        section {
          display: flex;
          justify-content: center;
        }
        .description {
          line-height: 1.5;
          text-align: justify;
          font-size: var(--text-small);
          color: var(--medium);
        }
        .indent {
          text-indent: 2rem;
        }
        .title {
          line-height: 1.15;
          font-size: var(--text-medium);
          color: var(--medium);
        }
        .footnote {
          line-height: 1.5;
          font-size: var(--text-small);
          color: var(--light);
        }
        .date {
          font-size: var(--text-small);
          color: var(--dark);
        }
        a {
           {
            /* text-decoration: underline; */
          }
          color: var(--light);
        }
        a:hover {
          color: var(--dark);
        }
        ul {
          margin-left: 2em;
          margin-bottom: 1em;
        }
        li {
          line-height: 1.5;
          font-size: var(--text-small);
          color: var(--medium);
        }
      `}</style>
    </div>
  );
};

export default Resume;
