export const getReward = (score) => {
  if (score >= 7) {
    return {
      title: "Beacon of Light",
      icon: "👑",
      message: "Your wisdom lights the world around you!",
      theme: "golden",
      gradient: "from-amber-600 via-orange-600 to-red-600",
      quote: "May your light illuminate the world!"
    };
  }
  
  if (score >= 4) {
    return {
      title: "Radiant Soul",
      icon: "🌟",
      message: "Your understanding shines bright this Diwali!",
      theme: "radiant",
      gradient: "from-purple-600 via-pink-600 to-orange-600",
      quote: "Your spirit shines as bright as a thousand diyas!"
    };
  }
  
  return {
    title: "Growing Light",
    icon: "🌱",
    message: "Every diya starts with a spark — keep glowing brighter!",
    theme: "growing",
    gradient: "from-emerald-600 via-teal-600 to-cyan-600",
    quote: "Every journey begins with a single flame!"
  };
};