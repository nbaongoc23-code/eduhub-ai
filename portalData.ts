export interface GradeAppItem {
  subjectId: 'history' | 'english';
  subjectName: string;
  grade: 10 | 11 | 12;
  title: string;
  subtitle: string;
  url: string;
  tag: string;
  iconName: 'Landmark' | 'Languages';
  themeColor: {
    accent: string;
    bgSubtle: string;
    border: string;
    badgeBg: string;
    badgeText: string;
    buttonHover: string;
  };
}

export interface GradeGroup {
  grade: 10 | 11 | 12;
  label: string;
  desc: string;
  historyApp: GradeAppItem;
  englishApp: GradeAppItem;
}

export const DEFAULT_GRADE_PORTAL_DATA: GradeGroup[] = [
  {
    grade: 10,
    label: 'Khối 10',
    desc: 'Nền tảng kiến thức THPT chương trình GDPT mới',
    historyApp: {
      subjectId: 'history',
      subjectName: 'Môn Lịch Sử',
      grade: 10,
      title: 'Ứng Dụng AI Lịch Sử 10',
      subtitle: 'Khám phá văn minh nhân loại, lịch sử dân tộc và phương pháp học lịch sử',
      url: 'https://ai.studio/apps/945c1cf8-ec80-4f16-af28-f7d8b7410b0d',
      tag: 'Lịch sử 10',
      iconName: 'Landmark',
      themeColor: {
        accent: '#9a3412',
        bgSubtle: '#fff7ed',
        border: '#fed7aa',
        badgeBg: '#ffedd5',
        badgeText: '#9a3412',
        buttonHover: 'hover:bg-amber-800',
      },
    },
    englishApp: {
      subjectId: 'english',
      subjectName: 'Môn Tiếng Anh',
      grade: 10,
      title: 'Ứng Dụng AI Tiếng Anh 10',
      subtitle: 'Xây dựng nền tảng từ vựng, ngữ pháp cốt lõi và phát triển kỹ năng giao tiếp',
      url: 'https://ai.studio/apps/051495ec-0740-454f-b214-f1120dafcb64',
      tag: 'Tiếng Anh 10',
      iconName: 'Languages',
      themeColor: {
        accent: '#0284c7',
        bgSubtle: '#f0f9ff',
        border: '#bae6fd',
        badgeBg: '#e0f2fe',
        badgeText: '#0369a1',
        buttonHover: 'hover:bg-sky-700',
      },
    },
  },
  {
    grade: 11,
    label: 'Khối 11',
    desc: 'Phân hóa kiến thức chuyên sâu và rèn luyện kỹ năng tư duy',
    historyApp: {
      subjectId: 'history',
      subjectName: 'Môn Lịch Sử',
      grade: 11,
      title: 'Ứng Dụng AI Lịch Sử 11',
      subtitle: 'Cách mạng tư sản, lịch sử cận hiện đại và phong trào đấu tranh giành độc lập',
      url: 'https://ai.studio/apps/46c42a48-f961-400b-ae15-8e1b14811ebb',
      tag: 'Lịch sử 11',
      iconName: 'Landmark',
      themeColor: {
        accent: '#9a3412',
        bgSubtle: '#fff7ed',
        border: '#fed7aa',
        badgeBg: '#ffedd5',
        badgeText: '#9a3412',
        buttonHover: 'hover:bg-amber-800',
      },
    },
    englishApp: {
      subjectId: 'english',
      subjectName: 'Môn Tiếng Anh',
      grade: 11,
      title: 'Ứng Dụng AI Tiếng Anh 11',
      subtitle: 'Mở rộng ngữ pháp chuyên sâu, từ vựng học thuật và kỹ năng đọc hiểu nâng cao',
      url: 'https://ai.studio/apps/155e19dd-24f9-442f-89e6-1be86feab411',
      tag: 'Tiếng Anh 11',
      iconName: 'Languages',
      themeColor: {
        accent: '#0284c7',
        bgSubtle: '#f0f9ff',
        border: '#bae6fd',
        badgeBg: '#e0f2fe',
        badgeText: '#0369a1',
        buttonHover: 'hover:bg-sky-700',
      },
    },
  },
  {
    grade: 12,
    label: 'Khối 12',
    desc: 'Trọng tâm ôn thi Tốt nghiệp THPT & Đánh giá năng lực',
    historyApp: {
      subjectId: 'history',
      subjectName: 'Môn Lịch Sử',
      grade: 12,
      title: 'Ứng Dụng AI Lịch Sử 12',
      subtitle: 'Hệ thống hóa toàn diện lịch sử Việt Nam và thế giới, luyện đề thi trắc nghiệm THPT',
      url: 'https://ai.studio/apps/1953ca73-b887-4cea-bddf-98666d32801e',
      tag: 'Lịch sử 12',
      iconName: 'Landmark',
      themeColor: {
        accent: '#9a3412',
        bgSubtle: '#fff7ed',
        border: '#fed7aa',
        badgeBg: '#ffedd5',
        badgeText: '#9a3412',
        buttonHover: 'hover:bg-amber-800',
      },
    },
    englishApp: {
      subjectId: 'english',
      subjectName: 'Môn Tiếng Anh',
      grade: 12,
      title: 'Ứng Dụng AI Tiếng Anh 12',
      subtitle: 'Chiến thuật giải đề thi THPT Quốc gia, bẫy trắc nghiệm ngữ âm, từ vựng và bài đọc',
      url: 'https://ai.studio/apps/8585700d-72d1-4e9d-8301-2649c0346115',
      tag: 'Tiếng Anh 12',
      iconName: 'Languages',
      themeColor: {
        accent: '#0284c7',
        bgSubtle: '#f0f9ff',
        border: '#bae6fd',
        badgeBg: '#e0f2fe',
        badgeText: '#0369a1',
        buttonHover: 'hover:bg-sky-700',
      },
    },
  },
];
