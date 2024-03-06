/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useState } from "react";

const Page = () => {
  const [posts, setPosts] = useState([
    {
      id: 1,
      username: "착한초밥",
      profileImg:
        "https://search.pstatic.net/common/?src=http%3A%2F%2Fcafefiles.naver.net%2FMjAxOTA2MDNfOTkg%2FMDAxNTU5NTQ5OTA1Mzcy.n7N90zrsHufewPGqVf1ZwoMa92FNcxcwKYsqdC9z4GIg.Jhy68LOdaDxaaq4489SrQH-7sXDZ4dRwONibFotn0eMg.JPEG%2F1.jpg&type=a340",
      image:
        "https://i.ytimg.com/vi/5QZtEicDnIE/hq720.jpg?sqp=-oaymwEcCOgCEMoBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLDnlgqJ1GTrEorGmK3Z2zkJjM47ug",
      likes: 17800,
      hashtags: ["#3900원", "#착한초밥", "#초밥"],
      link: "https://www.youtube.com/watch?v=5QZtEicDnIE&pp=ygUX6rSR7Jq064yAIOywqe2VnOy0iOuwpSA%3D",
    },
    {
      id: 2,
      username: "학교종이 땡땡땡",
      profileImg:
        "https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2F20151016_10%2Fflawlessskin_1444958179110yH9XX_JPEG%2FIMG_4335.JPG&type=a340",
      image:
        "https://i.ytimg.com/vi/gBxBL_vqi1s/hq720_2.jpg?sqp=-oaymwE2COgCEMoBSFXyq4qpAygIARUAAIhCGABwAcABBvABAfgBzgWAAoAKigIMCAAQARhyIFAoRDAP&rs=AOn4CLCW-_bYQlb8hZ4yU16YLqcyjrlfOg",
      likes: 14300,
      hashtags: ["#순두부", "#돈까스", "#순쫄", "#순두부쫄면"],
      link: "https://www.youtube.com/shorts/gBxBL_vqi1s",
    },
    {
      id: 3,
      username: "마떡 다이천",
      profileImg:
        "https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyMTA5MTVfMTAy%2FMDAxNjMxNjk5NTQ3MDM1.09eltiN281sHeuJljloWYfPUb49F3NYiArD5W0TUJdIg.NmhdNJMA5kpNaHknjU8ExpoamIVpYHnA5Vsi34_gSoIg.JPEG.skill8114%2FIMG_6924.JPG&type=a340",
      image:
        "https://i.ytimg.com/vi/XadDR6bOcuk/hq720.jpg?sqp=-oaymwEcCOgCEMoBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLAfCOR23zq1Trvdmg7q16uD0q4PkQ",
      likes: 11200,
      hashtags: ["#떡볶이", "#2000원", "#가성비"],
      link: "https://www.youtube.com/watch?v=XadDR6bOcuk&pp=ygUQ6rSR7Jq064yAIOunm-ynkQ%3D%3D",
    },
    {
      id: 4,
      username: "남해바다마차",
      profileImg:
        "https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2F20151105_143%2Fkdhnim_14466980230139icNF_JPEG%2F%25B1%25E6%25C0%25BD%25BF%25AA%25B8%25C0%25C1%25FD.jpg&type=a340",
      image:
        "https://i.ytimg.com/vi/ET3ZsXLe2Fg/hq720.jpg?sqp=-oaymwEcCOgCEMoBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLDpNcJ4bbpjRiComsz5-338QVIx_Q",
      likes: 10300,
      hashtags: ["#대방어", "#회"],
      link: "https://www.youtube.com/watch?v=ET3ZsXLe2Fg&pp=ygUc6rSR7Jq064yAIOuCqO2VtOuwlOuLpOuniOywqA%3D%3D",
    },
    {
      id: 5,
      username: "오빠생각",
      profileImg:
        "https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAxNzExMDRfMjYy%2FMDAxNTA5NzUzODc3MDUz.15ldSKA6z3bJdth13xw_qj6X8tdndr3jOrk_m3ImEYcg.Ut5doXEMYND9zMBXyZkOVOp3J7OkNrswZqMW_bgzH7sg.JPEG.hoit2014%2F20171102_221008.jpg&type=a340",
      image:
        "https://i.ytimg.com/vi/AhA3X1s3jRA/hq720.jpg?sqp=-oaymwEcCOgCEMoBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLAAhoBP5s8rOjcFZK2bHMXynGmmCA",
      likes: 99000,
      hashtags: ["#한식", "#떡볶이", "#석계역", "#맛집"],
      link: "https://www.youtube.com/watch?v=AhA3X1s3jRA&pp=ygUW7ISd6rOE7JetIOyYpOu5oOyDneqwgQ%3D%3D",
    },
    {
      id: 6,
      username: "진미곱창",
      profileImg:
        "https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAxNzA5MTZfMTg5%2FMDAxNTA1NTM2OTc1NDUw.GimAwI4pQiSdkbTuK5xn6bP4L3Aendc7H98Q64OPwNUg.vT_35SyV4X6c7DjhmT16cmUxgg1KDjBzfucREXR1ws8g.JPEG.pooq87%2F%25BC%25F6%25C1%25A4%25B5%25CA_DSC06128.jpg&type=a340",
      image:
        "https://i.ytimg.com/vi/GslxEl6ZQyg/hqdefault.jpg?sqp=-oaymwEcCOADEI4CSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLAnXv3zWtuXYNsVV5L-dHabu4IIEQ",
      likes: 8100,
      hashtags: ["#곱창", "#소곱창", "#진미"],
      link: "https://www.youtube.com/watch?v=GslxEl6ZQyg&t=33s&pp=ygUW7ISd6rOE7JetIOynhOuvuOqzseywvQ%3D%3D",
    },
    {
      id: 7,
      username: "엄마마늘보쌈",
      profileImg:
        "https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAxODEwMTdfMjg3%2FMDAxNTM5NzY3MjM5MzA5.FzJASPzW99rdlxRRwuwyuqZj2hCqamrnFVIVCBZ_J-cg.4uHS0U0tBZoMEgT-o3nmw9RhcI5XRZ3PeSN4s9Vsf3Qg.PNG.yunsssss3%2F%25B1%25D7%25B8%25B257.png&type=a340",
      image:
        "https://i.ytimg.com/vi/2YvOxiIm54A/hq720.jpg?sqp=-oaymwEcCOgCEMoBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLD2qexomQefZJthZU7Q6Ahbo51iyQ",
      likes: 6900,
      hashtags: ["#마늘", "#보쌈", "#석계역맛집", "#마늘보쌈"],
      link: "https://www.youtube.com/watch?v=2YvOxiIm54A&pp=ygUQ7ISd6rOE7JetIOunm-ynkQ%3D%3D",
    },
    {
      id: 8,
      username: "아리랑 포차",
      profileImg:
        "https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyMTExMjNfMTE1%2FMDAxNjM3Njc1NDMwMjE5.UHhKLB841dpMADcUL8-IAko9Pwk02102TfuVGPWorrYg.XSbL0wbLCShX5a2xdkK34JHU_mJJsD7oM94xUJqkFUIg.JPEG.hgy1994%2FIMG_1027.jpg&type=a340",
      image:
        "https://i.ytimg.com/vi/MWzuABI53Uk/hq720_2.jpg?sqp=-oaymwEdCJUDENAFSFXyq4qpAw8IARUAAIhCcAHAAQbQAQE=&rs=AOn4CLAwD6PzdR2TQjyJVMd5h6PJXEdwXg",
      likes: 66000,
      hashtags: ["#포차", "#술"],
      link: "https://www.youtube.com/shorts/MWzuABI53Uk",
    },
    {
      id: 9,
      username: "창신동 매운족발",
      profileImg:
        "https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyMTAzMDNfMjUy%2FMDAxNjE0NzgwNzEwNzQ2.JDaGTV4RkE8Y82M-sDoTPQpEDRArOfWcKEyqClA8A5Qg.fCzw2yUlHMUFogWPrqQ8e7iY4d4QB0H1ons8n4JMqL4g.JPEG.crew09%2F20210228%25A3%25DF182234.jpg&type=a340",
      image:
        "https://i.ytimg.com/vi/1iHhyBGFF8E/oar2.jpg?sqp=-oaymwEdCJUDENAFSFWQAgHyq4qpAwwIARUAAIhCcAHAAQY=&rs=AOn4CLBdDpYDnxulGPwxChwVwR4ln5AuAw",
      likes: 5700,
      hashtags: ["#족발", "#불", "#유명맛집"],
      link: "https://www.youtube.com/shorts/1iHhyBGFF8E",
    },
    {
      id: 10,
      username: "석계역 한입 삼겹살",
      profileImg:
        "https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyMzEwMjFfNTMg%2FMDAxNjk3ODczMjg5OTMx.6zRBGwojte0Jxx9rf8QtOHN3wgt5qcKuh8VClHKeMIAg.KX0GiHZnbbAISrd48Wti0MN93HY_Q3ry57x-K12l2Pwg.JPEG.moom4398%2F20231020%25A3%25DF205535.jpg&type=a340",
      image:
        "https://i.ytimg.com/vi/0fM0_X1drcc/hq720_2.jpg?sqp=-oaymwEdCJYDENAFSFXyq4qpAw8IARUAAIhCcAHAAQbQAQE=&rs=AOn4CLAzV4F5bmpaKsZvk1_R7e9cXFo1PA",
      likes: 5400,
      hashtags: ["#삼겹살", "#한입삼겹살"],
      link: "https://www.youtube.com/shorts/0fM0_X1drcc",
    },
  ]);

  return (
    <div className="container mx-auto p-4">
      {posts.map((post) => (
        <a
          key={post.id}
          href={post.link}
          target="_blank"
          rel="noopener noreferrer"
        >
          <div className="mb-4 p-4 border rounded-lg">
            <div className="mb-2">
              <img
                src={post.image}
                alt={`Post by ${post.username}`}
                className="w-full rounded-lg"
              />
            </div>
            <div>
              <div className="flex">
                <img
                  src={post.profileImg}
                  alt={`Profile of ${post.username}`}
                  className="w-8 h-8 rounded-full mr-2"
                />
                <span className="text-lg font-semibold">{post.username}</span>
              </div>
            </div>

            <div className="flex justify-between">
              <div>
                <div className="flex space-x-2">
                  {post.hashtags.map((tag, index) => (
                    <span key={index} className="text-gray-500">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <span className="text-gray-500">조회수 {post.likes}회</span>
              </div>
            </div>
            <div className="mt-2"></div>
          </div>
        </a>
      ))}
    </div>
  );
};

export default Page;
