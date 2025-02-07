"use client";

import { PORTFOLIO } from "@/src/constants/portfolio/portfolio.ko";
import { cn } from "@/src/functions/util";
import gsap from "gsap";
import { FC, useEffect, useState } from "react";
import { isMobile } from "react-device-detect";
import { PortfolioImages } from "./Images";
import { PortfolioDetailDescription } from "./PortfolioDetailDescription";

const { DATA } = PORTFOLIO;

interface PortfolioItemProps {
  item: (typeof DATA)[number];
  isShowDetail: boolean;
}

export const PorfolioDetail: FC<PortfolioItemProps> = ({
  item,
  isShowDetail,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const videoUrl = process.env.NEXT_PUBLIC_VIDEO_URL;
  const isDev = process.env.NEXT_PUBLIC_ENV === "development";

  // 아래 함수는 PortfolioItem과 함께 움직인다.
  const onShowDetail = () => {
    gsap.to(".portfolio-item-title", {
      translateY: "0",
      duration: 0.5,
    });

    gsap.to(".portfolio-item-subtitle", {
      translateY: "0",
      duration: 0.7,
    });

    gsap.to(".portfolio-item-title-cover", {
      delay: 1,
      top: "12rem", // 마지막 애니매이션에서 최대 높이를 지정하는 곳
      duration: 0.7,
    });

    gsap.to(".portfolio-item-content", {
      delay: 1,
      translateY: "0",
      duration: 0.7,
    });

    gsap.to(".portfolio-item-teamname", {
      translateY: "0",
      duration: 0.5,
    });

    gsap.to(".portfolio-item-teamname", {
      delay: 2,
      translateY: "24rem",
      duration: 0.5,
    });

    gsap.to(".portfolio-item-people", {
      translateY: "0",
      duration: 0.7,
    });

    gsap.to(".portfolio-item-people", {
      delay: 2,
      translateY: "24rem",
      duration: 0.7,
    });

    gsap.to(".portfolio-item-images-cover", {
      delay: 1,
      translateY: "0",
      duration: 0.7,
    });
  };

  const deleteShowDetail = () => {
    gsap.to(".portfolio-item-title", {
      translateY: "24rem",
      duration: 0.5,
    });

    gsap.to(".portfolio-item-subtitle", {
      translateY: "24rem",
      duration: 0.7,
    });

    gsap.to(".portfolio-item-title-cover", {
      bottom: 10,
      top: "auto",
      duration: 0.7,
    });

    gsap.to(".portfolio-item-content", {
      translateY: isMobile ? "200vh" : "100vh",
      duration: 0.7,
    });

    gsap.to(".portfolio-item-teamname", {
      translateY: "24rem",
      duration: 0.5,
    });

    gsap.to(".portfolio-item-people", {
      translateY: "24rem",
      duration: 0.7,
    });
    gsap.to(".portfolio-item-images-cover", {
      translateY: "100vh",
      duration: 0.7,
    });
  };

  useEffect(() => {
    if (isShowDetail) {
      onShowDetail();
    } else {
      deleteShowDetail();
    }
  }, [isShowDetail]);

  return (
    <>
      <div className="portfolio-item-title-cover fixed bottom-10 left-14 z-30 w-[50%] break-words font-bold text-white max-lg:w-[90%]">
        <div
          className={cn(
            "portfolio-item-title mb-5 translate-y-96 uppercase",
            isMobile ? "text-7xl" : "text-7xl"
          )}
        >
          {item.TITLE}
        </div>

        <div
          className={cn(
            "portfolio-item-subtitle translate-y-96 leading-relaxed",
            isMobile ? "text-3xl" : "text-xl"
          )}
        >
          {item.SUBTITLE.split("\n").map((line, index) => (
            <div key={index}>{line}</div>
          ))}
        </div>
        {isDev && (
          <button
            className="transition-all hover:opacity-80"
            onClick={() => setIsModalOpen(true)}
          >
            발표 다시보기 &rarr;
          </button>
        )}
      </div>
      <PortfolioDetailDescription item={item} />
      <div className="fixed bottom-10 right-14 z-30 text-right font-bold text-white max-lg:hidden">
        <div className="portfolio-item-teamname mb-5 translate-y-96 text-2xl">
          {item.TEAM_NAME}
        </div>
        <div className="portfolio-item-people translate-y-96 text-xl">
          {item.PEOPLE}
        </div>
      </div>
      <div
        className={cn(
          "portfolio-item-images-cover fixed bottom-10 right-14 top-32 z-30 flex w-[40%] translate-y-[100vh] flex-col gap-4 overflow-x-auto max-xl:hidden"
        )}
      >
        <PortfolioImages images={item.INTRODUCTION} />
      </div>

      {isModalOpen && (
        <div
          className="fixed left-0 top-0 z-50 h-full w-full bg-black bg-opacity-90"
          onClick={(e) => {
            e.stopPropagation();
            setIsModalOpen(false);
          }}
        >
          <video
            className="fixed left-1/2 top-1/2 z-50 -translate-x-1/2 -translate-y-1/2 transform-gpu rounded-lg shadow-lg"
            src={videoUrl}
            onClick={(e) => e.stopPropagation()}
            controls
          />
        </div>
      )}
    </>
  );
};
