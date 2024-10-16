 export default function (){

   const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3000/get', {
          method: 'GET', // نوع درخواست
          headers: {
            'Content-Type': 'application/json', // نوع محتوا
            // اگر نیاز به هدرهای دیگر دارید، آن‌ها را اضافه کنید
            'type':'video'
          },
          mode:'no-cors'
        });
    
        // بررسی اینکه آیا پاسخ موفقیت‌آمیز بود
        if (!response.ok) {
          throw new Error(`Errrrrrrrrrrrrror: ${response.status}`);
        }
    
        const data = await response.json(); // تبدیل پاسخ به JSON
        console.log(data); // چاپ داده‌های دریافتی
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData()
 } 
  // برای اجرای تابع
  