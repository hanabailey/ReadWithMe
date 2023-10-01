import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

function Rate({ isbn }) {
  const [starFrequency, setStarFrequency] = useState([0, 0, 0, 0, 0]);
  const [userCount,setuserCount] = useState<any>();
  const [averageRating , setAverageRating] = useState(0)
  const supabase = createClientComponentClient();

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const { data, error } = await supabase
          .from("user_books")
          .select("star_review")
          .eq("isbn", isbn);

        if (error) {
          console.error("에러", error);
        } else {
          if (data && data.length > 0) {
            const starReviewData = data
              .map((review) => review.star_review)
              .filter((starReview) => starReview !== null);
              const userCount= starReviewData.length;
              setuserCount(userCount)

              if (starReviewData.length > 0) {
                const sum = starReviewData.reduce((acc, rating) => acc + rating, 0);
                const average = sum / starReviewData.length;
                setAverageRating(average);
              }

            // 별점 빈도수 계산
            const newStarFrequency = [0, 0, 0, 0, 0];
            starReviewData.forEach((rating) => {
              newStarFrequency[rating - 1]++;
            });

            setStarFrequency(newStarFrequency);
          }
        }
      } catch (error) {
        console.error("에러", error);
      }
    };

    fetchReviews();
  }, [isbn]);

  const chartData = {
    labels: ["1 Star", "2 Stars", "3 Stars", "4 Stars", "5 Stars"],
    datasets: [
      {
        label: "star ",
        data: starFrequency,
        backgroundColor: [
          "#A4C3B2",
          "#A4C3B2",
          "#A4C3B2",
          "#A4C3B2",
          "#A4C3B2",
          
        ],
        
        borderWidth: 1,
      },
    ],
  };

  return (
    <div>
      <h3>Total Users : {userCount}</h3>
      <h4>Average Rating :{averageRating}</h4>

      <Bar
        data={chartData}
        options={{
          scales: {
            y: {
              display:false,
            },
          },
        }}
      />
    </div>
  );
}

export default Rate;
