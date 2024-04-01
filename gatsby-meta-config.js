module.exports = {
  title: `scottXchoo`,
  description: `추교현의 블로그`,
  language: `ko`, // `ko`, `en` => currently support versions for Korean and English
  siteUrl: `https://www.scottxchoo.xyz`,
  ogImage: `/og-image.png`, // Path to your in the 'static' folder
  comments: {
    utterances: {
      repo: `scottXchoo/scottXchoo.xyz`, // `zoomkoding/zoomkoding-gatsby-blog`,
    },
  },
  ga: 'G-SZQ76SSX3F', // Google Analytics Tracking ID
  author: {
    name: `추교현`,
    bio: {
      role: `소프트웨어 엔지니어`,
      description: ['세상에 선한 영향력을 주고 싶은', '성실함과 꾸준함이 강점인'],
      thumbnail: 'sample.png', // Path to the image in the 'asset' folder
    },
    social: {
      github: `https://github.com/scottXchoo`, // `https://github.com/zoomKoding`,
      instagram: `https://www.instagram.com/dev.chooble/`,
      x: `https://twitter.com/dev_chooble`,
      linkedIn: `https://www.linkedin.com/in/devchooble/`, // `https://www.linkedin.com/in/jinhyeok-jeong-800871192`,
      email: `ckh0601@gmail.com`, // `zoomkoding@gmail.com`,
    },
  },

  // metadata for About Page
  about: {
    timestamps: [
      // =====       [Timestamp Sample and Structure]      =====
      // ===== 🚫 Don't erase this sample (여기 지우지 마세요!) =====
      {
        date: '',
        activity: '',
        links: {
          github: '',
          post: '',
          googlePlay: '',
          appStore: '',
          demo: '',
        },
      },
      // ========================================================
      // ========================================================
      {
        date: '22.05 - 23.07',
        activity: '⛓️ 블록체인 스타트업 A41 풀타임 근무',
        links: {
          post: '',
          github: '',
          demo: 'https://www.a41.io/ko',
        },
      },
      {
        date: '22.06 - 23.05',
        activity: '🏛️ 블록체인 학회 CURG 학회장',
        links: {
          post: '',
          github: '',
          demo: 'http://curg.xyz/',
        },
      },
      {
        date: '22.03 - 22.08',
        activity: '🦁 멋쟁이사자처럼 10기 프론트엔드 파트',
        links: {
          post: '',
          github: '',
          demo: '',
        },
      },
      {
        date: '21.09 - 22.03',
        activity: '🏠 대학생 단기임대 플랫폼 창업 도전',
        links: {
          post: '',
          github: '',
          demo:
            'https://blog.naver.com/PostView.naver?blogId=ktngstartupcamp&logNo=222664717203&parentCategoryNo=&categoryNo=73&viewDate=&isShowPopularPosts=true&from=search',
        },
      },
      {
        date: '21.06 - ing',
        activity: '🏡 대학생 셰어하우스 사업',
        links: {
          post: '',
          github: '',
          demo: 'https://blog.naver.com/cnryguscnrygus/222350700228',
        },
      },
    ],

    projects: [
      // =====        [Project Sample and Structure]        =====
      // ===== 🚫 Don't erase this sample (여기 지우지 마세요!)  =====
      {
        title: '',
        description: '',
        techStack: ['', ''],
        thumbnailUrl: '',
        links: {
          post: '',
          github: '',
          googlePlay: '',
          appStore: '',
          demo: '',
        },
      },
      // ========================================================
      // ========================================================

      {
        title: 'Supernova',
        description: 'Cosmos 블록체인의 리퀴드 스테이킹 프로토콜 DeFi 플랫폼',
        techStack: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'React Query', 'Recoil'],
        thumbnailUrl: 'supernova.png',
        links: {
          post: '',
          github: 'https://github.com/scottXchoo/Supernova_Front-end',
          demo: '',
        },
      },
      {
        title: 'Project Gateway',
        description: 'Archway 플랫폼에서 Web2.0과 Web3.0을 연결하는 솔루션',
        techStack: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS'],
        thumbnailUrl: 'gateway.png',
        links: {
          post: '',
          github: 'https://github.com/D3LAB-DAO/gateway-frontend',
          demo: 'https://gateway-frontend.vercel.app',
        },
      },

      {
        title: 'COSMonaut',
        description:
          'Cosmos 블록체인의 컨트랙트 언어인 CosmWasm을 개발자들이 쉽게 배울 수 있도록 돕는 웹사이트',
        techStack: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS'],
        thumbnailUrl: 'cosmonaut.png',
        links: {
          post: '',
          github: 'https://github.com/scottXchoo/Cosmonaut_Front-end',
          demo: 'https://cosmonaut.cosmwasm.com/',
        },
      },
    ],
  },
};
