import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Footer from "../components/Footer";
import { ethers } from "ethers";
import { IPFS_GATEWAY } from "./../utils/ipfsStorage";
import Blog from "../artifacts/MyBlog.sol/MyBlog.json";
import { contractAddress, networkDeployedTo } from "../utils/contracts-config";
import networksMap from "../utils/networksMap.json";

const Home = () => {
  const data = useSelector((state) => state.blockchain.value);

  const [postsList, SetPostsList] = useState([]);
  const [msg, setMsg] = useState("No post published yet");

  async function getPostsList() {
    if (data.network === networksMap[networkDeployedTo]) {
      const provider = new ethers.providers.Web3Provider(
        window.ethereum,
        "any"
      );
      const blog = new ethers.Contract(contractAddress, Blog.abi, provider);
      const posts = await blog.getAllPosts();

      if (posts.length !== 0) {
        const items = await Promise.all(
          posts.map(async (p) => {
            const imageUrl = p[3].replace("ipfs://", IPFS_GATEWAY);
            const item = {
              id: Number(p[0]),
              title: p[1],
              overview: p[2],
              coverImage: imageUrl,
              readTime: Number(p[4]),
              createdAt: new Date(Number(p[6]) * 1000),
              type: p[7],
            };
            return item;
          })
        );
        SetPostsList(items.reverse());
      }
    } else {
      setMsg(`Please switch to the ${networksMap[networkDeployedTo]} network`);
    }
  }

  useEffect(() => {
    if (window.ethereum !== undefined) {
      getPostsList();
    }
  }, [data.network]);

  const featuredBlocks = [
    {
      id: 1,
      image: 'https://img.freepik.com/premium-vector/law-justice-vector-logo-design-with-modern-letter-concept_1028688-110.jpg?ga=GA1.1.297130150.1736279582&semt=ais_tags_boosted',
      title: 'Advo Talks',
      description: ' A platform for the people, by the people.',
      uploadDate: '2025-01-15',
      link: '/Advitalk'
    },
    {
      id: 2,
      image: 'https://img.freepik.com/free-vector/cryptocurrency-bitcoin-golden-coin-background_1017-31505.jpg?t=st=1736896936~exp=1736900536~hmac=272c385c15d5359e89c825375e2f8bb99224a923f0de9e666557fa8515845177&w=1060',
      title: 'BITCOIN',
      description: ' The future of money is here. Learn more about the technology behind it.',
      uploadDate: '2025-01-15',
      link: '/bitcoin'
    },
    {
      id: 3,
      image: 'https://blog.dataiku.com/hs-fs/hubfs/finops-diagram.jpeg?width=777&name=finops-diagram.jpeg',
      title: 'FinOps',
      description: 'The future of finance is here. Learn more about the technology behind it.',
      uploadDate: '2025-01-15',
      link: '/finops'
    },
    {
      id: 4,
      image: 'https://img.freepik.com/premium-vector/neo-mining-set-icons-vector-illustration-design_25030-11846.jpg?ga=GA1.1.297130150.1736279582&semt=ais_tags_boosted',
      title: 'BlockChain',
      description: 'The future of technology is here. Learn more about the technology behind it.',
      uploadDate: '2025-01-14',
      link: '/bc'
    },
    {
      id: 5,
      image: 'https://img.freepik.com/free-photo/cyberpunk-illustration-with-neon-colors-futuristic-technology_23-2151672005.jpg?ga=GA1.1.297130150.1736279582&semt=ais_tags_boosted',
      title: 'Human AI InterFace',
      description: 'The future of technology is here. Learn more about the technology behind it.',
      uploadDate: '2023-01-13',
      link: '/ai'
    }
  ];

  return (
    <>
      <section className="home">
        <div className="home-text container">
          <h2 className="home-title">The BLOG HEAVEN</h2>
          <span className="home-subtitle">
            PRESENSING THE FUTURE OF BLOGGING WITH BLOCKCHAIN TECHNOLOGY  🚀<br/>
            Presented BY: Manasvi Rajendra & Team 
          </span>
        </div>
      </section>
      <section>
        {postsList.length !== 0 ? (
          <>
            <h2 className="post-head">Latest Posts</h2>
            <div className="post container">
              {postsList.map((post, index) => {
                return (
                  <div className="post-box" key={index}>
                    <img src={post.coverImage} className="post-img" />
                    <a href={"/post/" + String(post.id)} className="post-title">
                      {post.title}
                    </a>
                    <span className="post-date">
                      {`  ${post.createdAt.toLocaleString("default", {
                        day: "2-digit",
                        month: "long",
                        year: "numeric",
                      })}`}
                    </span>
                  </div>
                );
              })}
            </div>
          </>
        ) : (
          <p></p>
        )}
      </section>

      <section>
        <h2 className="post-head">Featured Blocks</h2>
        <div className="post container">
          {featuredBlocks.map((block) => (
            <div className="post-box" key={block.id}>
              <img src={block.image} className="post-img" />
              <a href={block.link} className="post-title">
                {block.title}
              </a>
              <span className="post-date">Uploaded on: {new Date(block.uploadDate).toLocaleDateString()}</span>
              <p className="post-description">
                {block.description}
                <br />
                <button 
                  style={{ fontSize: "12px", marginTop: "10px" }} 
                  onClick={() => window.location.href = block.link}
                >
                  Read
                </button>
              </p>
            </div>
          ))}
        </div>
      </section>
      <Footer />
    </>
  );
};

export default Home;
