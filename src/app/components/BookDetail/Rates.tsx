import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

function Rate({isbn}) {
  const [starReviews, setStarReviews] = useState();
  const supabase = createClientComponentClient();

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const { data, error } = await supabase
          .from("user_books")
          .select("star_review")
          .eq("isbn", isbn);
          console.log(data)
          //데이터가안들어오고 있음 / RLS 접근 가능하게 해둔 상태

        if (error) {
          console.error("에러", error);
        } else {
        
            if (data && data.length > 0 && data[0].star_review) {
                // 사용자의 star_review 데이터만 추출하여 배열에 저장
                const starReviewData = data.map((review) => review.star_review);
                setStarReviews(starReviewData);
              }
        }
      } catch (error) {
        console.error("에러", error);
      }
    };

    fetchReviews();
  }, [isbn]);

  // 바 차트 데이터 설정
  const chartData = {
    labels: ["1 Star", "2 Stars", "3 Stars", "4 Stars", "5 Stars"],
    datasets: [
      {
        label: "별점 분포",
        data: [1, 2, 3, 4, 5],
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(255, 159, 64, 0.2)",
          "rgba(255, 205, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(54, 162, 235, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(255, 159, 64, 1)",
          "rgba(255, 205, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(54, 162, 235, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

//   // 별점 빈도수 계산
//   starReviews.forEach((rating) => {
//     chartData.datasets[0].data[rating - 1]++;
//   });

  return (
    <div>
      {/* <Bar
        data={chartData}
        options={{
          scales: {
            y: {
            type: 'linear', 
              beginAtZero: true,
              stepSize: 1,
            },
          },
        }}
      /> */}
    </div>
  );
}

export default Rate;
