"use client";

import React, { useState } from "react";
import Rating from "@/components/ui/Rating";
import { Rating as RatingType } from "react-simple-star-rating";

interface Review {
  name: string;
  rating: number;
  review: string;
  date: string;
}

type ProductReviewsProps = {
  rating: number;
  review: any;
};

const ProductReviews = ({ rating, review }: ProductReviewsProps) => {
  const [userRating, setUserRating] = useState<number>(0);
  const [reviewText, setReviewText] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [saveInfo, setSaveInfo] = useState(false);
  const [reviews, setReviews] = useState<Review[]>([
    {
      name: "Emily R.",
      rating: 5,
      review:
        "Great seller, everything was as expected even threw in a free gift, which was a nice touch already reordered.",
      date: "Mar 3rd, 2025",
    },
  ]);

  const ratingCounts: any = {
    5: 10,
    4: 5,
    3: 3,
    2: 3,
    1: 3,
  };

  const handleRating = (rate: number) => {
    setUserRating(rate);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newReview: Review = {
      name,
      rating: userRating,
      review: reviewText,
      date: new Date().toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      }),
    };

    setReviews([newReview, ...reviews]);

    // Reset form
    setUserRating(0);
    setReviewText("");
    setName("");
    setEmail("");
    setSaveInfo(false);
  };

  return (
    <>
      {/* border border-border rounded-lg p-6 bg-background */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <div className="font-semibold mb-4 text-foreground">
            Customer review
          </div>
          <div className="flex items-center gap-2 mb-2">
            {/* <span className="text-yellow-500">★★★★☆</span> */}
            <div className="inline-stars text-yellow-500">
              {/* <Rating initialValue={4.5} readonly size={20} allowFraction /> */}
              <Rating
                initialValue={rating}
                allowFraction
                SVGclassName="inline-block"
                emptyClassName="fill-gray-50"
                size={19}
                readonly
              />
            </div>
            <span className="text-xs text-muted-foreground">(23)</span>
            <span className="ml-2 text-foreground">4.5/5.0</span>
          </div>

          {/* Rating Breakdown */}
          <div className="mb-6 space-y-2">
            {[5, 4, 3, 2, 1].map((star) => (
              <div key={star} className="flex items-center gap-2 text-sm">
                <span className="w-6">{star}★</span>
                <div className="flex-1 bg-gray-200 rounded h-2">
                  <div
                    className="bg-foreground h-2 rounded"
                    style={{
                      width: `${(ratingCounts[star] / 10) * 100}%`,
                    }}
                  />
                </div>
                <span className="w-6 text-right">{ratingCounts[star]}</span>
              </div>
            ))}
          </div>

          {/* Reviews */}
          <div className="space-y-6 mb-10">
            {reviews.map((review, idx) => (
              <div key={idx}>
                <div className="text-sm text-foreground font-medium">
                  {review.name}
                  <span className="text-xs text-muted-foreground ml-2">
                    {review.date}
                  </span>
                  <div className="flex items-center text-yellow-500 mt-1">
                    <div className="inline-stars text-yellow-500">
                      <Rating initialValue={review.rating} readonly size={18} />
                    </div>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground mt-1">
                  {review.review}
                </p>
              </div>
            ))}
          </div>
        </div>
        <div>
          {/* Write a Review */}
          <div className="mt-4">
            <div className="font-semibold mb-2 text-foreground text-lg">
              Write a review
            </div>
            <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
              <div className="flex gap-2 items-center text-sm">
                <span className="text-foreground">Your rating:</span>
                <div className="inline-stars text-yellow-500">
                  <Rating
                    onClick={handleRating}
                    initialValue={userRating}
                    allowFraction
                    size={20}
                  />
                </div>
              </div>
              <input
                required
                placeholder="Name *"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="border p-2 rounded"
              />
              <input
                required
                placeholder="Email *"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="border p-2 rounded"
              />
              <textarea
                required
                placeholder="Your review *"
                value={reviewText}
                onChange={(e) => setReviewText(e.target.value)}
                className="border p-2 rounded"
              />
              <label className="text-sm flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={saveInfo}
                  onChange={(e) => setSaveInfo(e.target.checked)}
                />
                Save my name, email for next time
              </label>
              <button
                type="submit"
                className="mt-2 px-4 py-2 rounded hover:bg-gray-800 bg-foreground text-background"
              >
                Submit Review
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductReviews;

{
  /* 
            <div className="mb-4">
              <div className="flex items-center gap-2 text-xs">
                <span>5★</span>
                <span className="w-24 bg-muted h-2 rounded">
                  <span className="block bg-foreground h-2 rounded w-[80%]"></span>
                </span>
                <span>10</span>
              </div>
              <div className="flex items-center gap-2 text-xs">
                <span>4★</span>
                <span className="w-24 bg-muted h-2 rounded">
                  <span className="block bg-foreground h-2 rounded w-[50%]"></span>
                </span>
                <span>5</span>
              </div>
              <div className="flex items-center gap-2 text-xs">
                <span>3★</span>
                <span className="w-24 bg-muted h-2 rounded">
                  <span className="block bg-foreground h-2 rounded  w-[30%]"></span>
                </span>
                <span>3</span>
              </div>
              <div className="flex items-center gap-2 text-xs">
                <span>2★</span>
                <span className="w-24 bg-muted h-2 rounded">
                  <span className="block bg-foreground h-2 rounded  w-[10%]"></span>
                </span>
                <span>3</span>
              </div>
              <div className="flex items-center gap-2 text-xs">
                <span>1★</span>
                <span className="w-24 bg-muted h-2 rounded">
                  <span className="block bg-foreground h-2 rounded  w-[10%]"></span>
                </span>
                <span>3</span>
              </div>
            </div>
            <button className="bg-foreground text-background px-4 py-2 rounded mb-4">
              Write a review
            </button>
            <div className="mb-4">
              <div className="mb-2 font-semibold text-foreground">
                Emily R.
                <span className="text-xs text-muted-foreground ml-2">
                  Mar 3rd, 2025
                </span>
                <span className="text-yellow-500">★★★★★</span>
              </div>
              <div className="text-sm text-muted-foreground mb-2">
                Great seller, everything was as expected even threw in a free
                gift, which was a nice touch already reordered
              </div>
              <div className="mb-2 font-semibold text-foreground">
                James L.
                <span className="text-xs text-muted-foreground ml-2">
                  Mar 3rd, 2025
                </span>
                <span className="text-yellow-500">★★★★★</span>
              </div>
              <div className="text-sm text-muted-foreground mb-2">
                Great seller, everything was as expected even threw in a free
                gift, which was a nice touch already reordered
              </div>
              <div className="mb-2 font-semibold text-foreground">
                Sophia M.
                <span className="text-xs text-muted-foreground ml-2">
                  Mar 3rd, 2025
                </span>
                <span className="text-yellow-500">★★★★★</span>
              </div>
              <div className="text-sm text-muted-foreground mb-2">
                Great seller, everything was as expected even threw in a free
                gift, which was a nice touch already reordered
              </div>
            </div>
            <div className="mt-4">
              <div className="font-semibold mb-2 text-foreground">
                Write a review
              </div>
              <form className="flex flex-col gap-2">
                <div className="flex gap-2 items-center">
                  <span className="text-foreground">Your rating</span>
                  <span className="text-yellow-500">☆☆☆☆☆</span>
                </div>
                <input
                  placeholder="Name *"
                  className="border border-border rounded px-2 py-1 bg-background text-foreground"
                  type="text"
                />
                <input
                  placeholder="Email *"
                  className="border border-border rounded px-2 py-1 bg-background text-foreground"
                  type="email"
                />
                <textarea
                  placeholder="Your review *"
                  className="border border-border rounded px-2 py-1 bg-background text-foreground"
                ></textarea>
                <label className="flex items-center gap-2 text-xs text-foreground">
                  <input type="checkbox" /> Save my name, email, and website in
                  this browser for the next time I comment.
                </label>
                <button className="bg-foreground text-background px-4 py-2 rounded mt-2">
                  Submit
                </button>
              </form>
            </div>
          </div> */
}
