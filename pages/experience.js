import Head from "next/head";
import { motion } from "framer-motion";

const textVariants = {
  exit: {
    x: -200,
    opacity: 0,
    transition: { duration: 0.2, ease: "easeOut" },
  },
  enter: {
    x: 0,
    opacity: 1,
    transition: {
      delay: 0,
      type: "spring",
      damping: 12,
      duration: 0.25,
      ease: "easeIn",
    },
  },
};

const Experience = () => {
  return (
    <div className="container">
      <Head>
        <title>Experience</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <section>
          <motion.div initial="exit" animate="enter" exit="exit">
            <motion.div variants={textVariants}>
              <h1 className="title">
                Senior Software Engineer -{" "}
                <a href="https://www.nytimes.com/wirecutter/">
                  The New York Times - Wirecutter
                </a>
              </h1>
              <div className="date">Software Engineer: 10/2020 - 01/2022</div>
              <div className="date">
                Senior Software Engineer: 01/2022 - present
              </div>
              <p className="description indent">TODO!</p>
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
              <span className="date">02/2019 - 10/2020</span>
              <p className="description indent">
                Develop and maintain a suite of customer-facing applications
                known as <a href="https://gordonnow.com/">Gordon Now</a> that
                automate customer support duties, provide information and
                ordering options, and enhance the customer experience while
                working in an Agile setting. These applications are in the form
                of a mobile app (iOS & Android), a Google Voice Assistant, and a
                chatbot that is embedded and tailored to various internal and
                customer-facing sites. I also helped design and build out the
                CI/CD processes that enforce code quality and automate
                deployments.
              </p>
              <div className="footnote">
                <code>
                  • Javascript, React, React Native, Redux, Redux-Saga, Expo,
                  Angular, Python, Java, Kotlin, Spring Boot, Drupal 8,
                  Wordpress, Google Cloud Platform, Kubernetes, Helm, Docker,
                  Jenkins, MySQL
                </code>
              </div>

              <hr />

              <h1 className="title">
                Web Developer (Contract) -{" "}
                <a href="https://gfs.com/en-us/">Gordon Food Service</a>
              </h1>
              <span className="date">06/2018 - 02/2019</span>
              <p className="description indent">
                Collaborated with many teams on a variety of projects in the
                marketing technology department. Notable projects include
                building multiple ETL processes that gather customer data from
                siloed sources which are then unified in Salesforce to power
                targeted digital marketing efforts, and scaling an internal ad
                server to support internationalized ads for Canadian customers.
              </p>
              <div className="footnote">
                <code>
                  • Javascript, React, Redux, Python, PHP, Drupal 8, Java
                </code>
              </div>

              <hr />

              <h1 className="title">
                Web Developer -{" "}
                <a href="https://onestopinc.com/">One Stop Inc.</a>
              </h1>
              <span className="date">11/2016 - 06/2018</span>
              <p className="description indent">
                Maintained and added features to a legacy B2B e-commerce site
                that handled ~80% of all sales. Lead the development of a
                complete redesign of the UI, and rearchitected the front end and
                middleware applications away from a deprecated framework and
                onto a modern tech stack. Also, set up load balancing and
                replication for the existing database, and ported the entire
                development environment from virtual machines to Docker
                containers.
              </p>
              <div className="footnote">
                <code>
                  • Javascript, Typescript, React, MobX, Vue, Node, Express,
                  jQuery, PHP, Python Django, Postgres, MongoDB, Vagrant, Docker{" "}
                </code>
              </div>

              <hr />

              <h1 className="title">Education</h1>
              <div className="date">08/2009 - 05/2013</div>
              <p>
                <strong className="description">
                  Central Michigan University - Mount Pleasant, MI
                </strong>
              </p>
              <em className="description">
                Bachelor of Applied Arts in 2-D Design; Philosophy Minor
              </em>
            </motion.div>
          </motion.div>
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
          border: 1px solid var(--very-dark);
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
        @media (max-width: 600px) {
        }
      `}</style>
    </div>
  );
};

export default Experience;
