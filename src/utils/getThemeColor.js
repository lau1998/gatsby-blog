const getThemeColor = () => {
  // 我们应该做这个检查，以免破坏编译
  const theme = typeof window !== 'undefined' && window.__theme;

  if (theme === 'light') return '#fff';
  if (theme === 'dark') return '#191921';
};

export default getThemeColor;
