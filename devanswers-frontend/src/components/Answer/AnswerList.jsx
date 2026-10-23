import "./AnswerList.css";
import VoteButtons from "../Shared/VoteButtons.jsx";

const AnswerList = ({ answers = [] }) => {
  const answerItems = Array.isArray(answers) ? answers : [];

  const formatDate = dateValue => {
    if (!dateValue) return "Date unavailable";

    const date = new Date(dateValue);
    if (Number.isNaN(date.getTime())) return "Date unavailable";

    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <section className='answer-list' aria-labelledby='answer-list-title'>
      <h2 id='answer-list-title' className='answer-list-title'>
        Answers ({answerItems.length})
      </h2>

      {answerItems.length === 0 ? (
        <p className='answer-list-empty'>
          No answers yet. Be the first to answer!
        </p>
      ) : (
        <ul className='answer-list-items'>
          {answerItems.map(answer => (
            <li className='answer-card' key={answer._id}>
              <article className='answer-card-content'>
                <div className='answer-voting'>
                  <VoteButtons
                    voteCount={answer.voteCount ?? 0}
                    onUpvote={() => alert("Upvoted!")}
                    onDownvote={() => alert("Downvoted!")}
                    variant='outline'
                    size='sm'
                  />
                </div>

                <div className='answer-details'>
                  <p className='answer-text'>{answer.answerText}</p>
                  <div className='answer-meta'>
                    <span className='answer-author'>
                      Answered by {answer.author?.name || "Anonymous"}
                    </span>
                    <time className='answer-date'>
                      {formatDate(answer.createdAt)}
                    </time>
                  </div>
                </div>
              </article>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
};

export default AnswerList;
