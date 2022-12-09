useEffect(() => {
  const timer = setInterval(
    () => { setSum(() => sum + 3) },
    1000);
  return () => {
    clearInterval(timer)
  }
},
  []  //如果指定的是[],回调函数只会在第一次render（）后执行
)