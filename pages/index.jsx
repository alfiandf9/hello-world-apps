import Head from "next/head";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Card from "../components/Card";
import Hero from "../components/Hero";
import Layout from "../components/Layout";
import Navbar from "../components/Navbar";
import nookies from "nookies";
import CardSection from "../components/ArticleSection";
import ArticleSection from "../components/ArticleSection";
import CardSkeleton from "../components/CardSkeleton";

export async function getServerSideProps(context) {
  const cookies = nookies.get(context);

  // TODO: Find out the rest of today's timestamp

  return {
    props: {
      cookies,
    },
  };
}

export default function Home({ cookies }) {
  const [banners, setBanners] = useState(null);
  const [user, setUser] = useState(null);
  const [isLoading, setLoading] = useState(false); // TODO: Make skeleton loading banner
  const router = useRouter();

  async function handleGetBanner(){
    setLoading(true);

    const req = await fetch("/api/banner");
    const res = await req.json();

    if (!req.ok) {
      setIsAuthorized(res);
      return false;
    }

    setLoading(false);
    setBanners(res);
  }
  
  useEffect(() => {
    // setLoading(true);
    // fetch("/api/banner")
    //   .then((res) => res.json())
    //   .then((data) => {
    //     setBanners(data);
    //     setLoading(false);
    //   });
    handleGetBanner();
  }, []);

  useEffect(() => {
    const data = localStorage.getItem("user");

    if (data) setUser(data);
  }, [user]);

  return (
    <Layout>
      <Head>
        <title>HelloWorld &mdash; Submission</title>
      </Head>
      <Navbar token={cookies.token} />
      {Object.keys(cookies).length > 0 && <Hero token={cookies.token} dataUser={user} />}
      <ArticleSection>
        {/* <CardSkeleton /> */}
        {isLoading ? <CardSkeleton /> : (
          banners &&
            banners
              .filter((banner) => banner.is_active)
              .map((filteredBanner) => (
                <div key={filteredBanner.id} className="max-w-sm bg-white rounded-lg border border-gray-200 shadow-md mx-5 mb-10">
                  <Card {...filteredBanner} />
                </div>
              ))
          
        )}
        {/* {banners &&
          banners
            .filter((banner) => banner.is_active)
            .map((filteredBanner) => (
              <div key={filteredBanner.id} className="max-w-sm bg-white rounded-lg border border-gray-200 shadow-md mx-5 mb-10">
                <Card {...filteredBanner} />
              </div>
            ))} */}
      </ArticleSection>
    </Layout>
  );
}
