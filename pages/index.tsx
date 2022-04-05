import Head from 'next/head'
import { useEffect } from 'react';
import styled from "styled-components";
import { useCollection, useDocument } from 'swr-firestore-v9';

export default function Home() {
  const { data } = useDocument(`users/fernando`);
  
  useEffect(()=>{
    console.log(data);
  },[data])
  
  return (
    <div >
      <Head>
        <title>Evernote Clone</title>
        <meta name="description" content="This is an Evernote Clone" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1>hola</h1>
      </main>
    </div>
  )
}