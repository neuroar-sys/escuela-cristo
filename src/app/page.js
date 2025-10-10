// src/app/page.js
// NO lleva 'use client'
import Hero from '@/components/hero/Hero';
import NextLive from '@/components/next-live/NextLive';
import LatestVideos from '@/components/latest-videos/LatestVideos';
import Testimonials from '@/components/testimonials/Testimonials';
import Questions from '@/components/questions/Questions';
import About from '@/components/about/About';
import Edificadores from '@/components/edificadores/Edificadores';



export default async function Home() {
  return (
    <main>
      <Hero />
      <NextLive id="next-live" />
      <LatestVideos id="latest-videos" />
      <Edificadores id="edificadores"/>
      <Testimonials id="testimonials" />
      <Questions id="questions" />
      <About id="about" />
    </main>
  );
}