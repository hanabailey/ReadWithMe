import {
  FC,
  PropsWithChildren,
  ReactElement,
  useContext,
  useMemo,
  useState,
} from "react";
import { DateTime } from "luxon";

import styles from "@/app/components/Calendar/Calendar.module.scss";
import { userBooksDetailContext } from "@/app/context/userBooksData";

type HabitTrackerPageProps = {
  // ...
};

export const HabitTrackerPage: FC<
  PropsWithChildren<HabitTrackerPageProps>
> = () => {
  const userBooksData = useContext(userBooksDetailContext);
  const [year, setYear] = useState<number>(DateTime.now().year);
  const [month, setMonth] = useState<number>(DateTime.now().month);
  const monthYearDisplay = DateTime.local(year, month).toFormat("MMM yyyy");

  // const [openHabitModal] = useModal(HabitModal, { size: "small", title: "Choose Habit" });
  const finishedBooks: { month: number; date: number; image: string }[] = [];
  userBooksData.forEach((data) => {
    if (!data.reading_end_date) return;
    const readingEndDate = DateTime.fromISO(data.reading_end_date);
    if (readingEndDate.year !== year || readingEndDate.month !== month) return;

    finishedBooks.push({ month: readingEndDate.month, date: readingEndDate.day, image: data.books.img });
  });

  console.log(finishedBooks);

  const calendarComponent = useMemo(() => {
    const day1 = DateTime.local(year, month, 1).weekday;
    let date = DateTime.local(year, month, 1).minus({
      days: day1 === 7 ? 0 : day1,
    });

    const weekRows: ReactElement[] = [];
    do {
      const dayCols: ReactElement[] = [];
      for (let i = 0; i < 7; i++) {
        const dateClone = DateTime.fromMillis(date.toMillis());

        dayCols.push(
          <div
            key={i}
            className={[
              "date-box",
              date.month === month ? "in-month" : "out-month",
            ]
              .filter(Boolean)
              .join(" ")}
            // onClick={() => openHabitModal({ date: dateClone })}
          >
            <div className="date">{date.day}</div>
            {finishedBooks &&
      finishedBooks 
        .filter((book) => date.month === book.month &&book.date === date.day)
        .map((book, index) => (
          <img key={index} src={book.image} className={styles.bookImg} />
        ))}
        </div>
        );
        date = date.plus({ day: 1 });
      }

      weekRows.push(
        <div key={date.toUnixInteger()} className={"week-row"}>
          {dayCols}
        </div>
      );
    } while (date.month === month);

    return weekRows;
  }, [
    month,
    // openHabitModal,
    year,
  ]);

  const goToRelativeMonth = (months: number) => {
    if (months === 0) return;

    const newDate = DateTime.local(year, month).plus({ month: months });
    setYear(newDate.year);
    setMonth(newDate.month);
  };

  return (
    <main className={styles.trackerApp}>
      <section className="header">
        <div className="btn btn-left" onClick={() => goToRelativeMonth(-1)}>
          &lt;
        </div>
        <div className="month-year-display">{monthYearDisplay}</div>
        <div className="btn btn-right" onClick={() => goToRelativeMonth(1)}>
          &gt;
        </div>
      </section>

      <section className="calendar">
        <div className="day-header">
          <div className="day">Sun</div>
          <div className="day">Mon</div>
          <div className="day">Tue</div>
          <div className="day">Wed</div>
          <div className="day">Thu</div>
          <div className="day">Fri</div>
          <div className="day">Sat</div>
        </div>

        {calendarComponent}
      </section>
    </main>
  );
};

// HabitTrackerPage.displayName = "HabitTrackerPage";
