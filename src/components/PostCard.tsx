import React, { useState } from 'react';
import type { Post } from '../types';
import {
  Heart,
  MessageCircle,
  Bookmark,
  MoreHorizontal,
  CheckCircle,
  Smile,
} from 'lucide-react';
import { InstagramDirectIcon } from './InstagramDirectIcon';
import confetti from 'canvas-confetti';
import { AboutMeCarousel } from './AboutMeCarousel';
import { OpenToWorkPost } from './OpenToWorkPost';
import { WisprPitchCarousel } from './WisprPitchCarousel';
import { PostImageCarousel } from './PostImageCarousel';
import { usePostInteractions } from '../hooks/usePostInteractions';

interface PostCardProps {
  post: Post;
  onSharePost?: (postId: string) => void;
}

export const PostCard: React.FC<PostCardProps> = ({ post, onSharePost }) => {
  const {
    isLiked,
    likesCount,
    isSaved,
    comments,
    toggleLike,
    setLikedDirectly,
    toggleSave,
    addComment,
    toggleCommentLike,
  } = usePostInteractions(post);

  const [newComment, setNewComment] = useState('');
  const [showHeartPop, setShowHeartPop] = useState(false);
  const [showAllComments, setShowAllComments] = useState(false);
  const [isCaptionExpanded, setIsCaptionExpanded] = useState(false);

  // Toggle Like with animation & celebratory pop
  const handleToggleLike = () => {
    if (!isLiked) {
      setShowHeartPop(true);
      setTimeout(() => setShowHeartPop(false), 800);
      confetti({
        particleCount: 18,
        spread: 55,
        origin: { y: 0.8 },
      });
    }
    toggleLike();
  };

  // Double tap on media triggers heart pop & likes if not liked
  const handleDoubleTap = () => {
    setLikedDirectly();
    setShowHeartPop(true);
    setTimeout(() => setShowHeartPop(false), 800);
  };

  // Toggle Save
  const handleToggleSave = () => {
    toggleSave();
  };

  // Add Comment
  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = newComment.trim();
    if (!trimmed) return;
    addComment(trimmed);
    setNewComment('');
    setShowAllComments(true);
  };

  // Toggle like on single comment
  const handleToggleCommentLike = (commentId: string) => {
    toggleCommentLike(commentId);
  };

  // Share action
  const handleShare = () => {
    if (onSharePost) {
      onSharePost(post.id);
      return;
    }
    if (navigator.share) {
      navigator.share({
        title: `${post.author.name}'s Portfolio Post`,
        text: post.caption.slice(0, 100),
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      confetti({ particleCount: 20, spread: 60, origin: { y: 0.8 } });
      alert('Post link copied to clipboard!');
    }
  };

  return (
    <article className="w-full bg-white dark:bg-black border-y sm:border sm:rounded-xl border-neutral-200 dark:border-neutral-800 transition-colors duration-200 overflow-hidden mb-4 sm:mb-6">
      {/* Post Header */}
      <div className="px-3.5 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-full p-[1.5px] story-gradient cursor-pointer hover:opacity-90">
            <img
              src={post.author.avatar}
              alt={post.author.username}
              className="w-full h-full rounded-full object-cover border border-white dark:border-black"
            />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-xs font-bold text-neutral-900 dark:text-white hover:underline cursor-pointer">
                {post.author.username}
              </span>
              {post.author.isVerified && (
                <CheckCircle size={12} className="text-blue-500 fill-blue-500" />
              )}
            </div>
            {(post.subtitle || post.author.location) && (
              <p className="text-[11px] text-neutral-500 dark:text-neutral-400 font-normal">
                {post.subtitle || post.author.location}
              </p>
            )}
          </div>
        </div>

        <button
          className="text-neutral-500 hover:text-neutral-900 dark:hover:text-white p-1 rounded-full transition-colors"
          aria-label="More post options"
        >
          <MoreHorizontal size={20} />
        </button>
      </div>

      {/* Post Media Container with Double-Tap Heart Pop */}
      <div className="relative w-full">
        {post.images && post.images.length > 0 ? (
          <PostImageCarousel
            images={post.images}
            onDoubleTap={handleDoubleTap}
          />
        ) : post.type === 'about_carousel' ? (
          <AboutMeCarousel onDoubleTap={handleDoubleTap} />
        ) : post.type === 'pitch_carousel' && post.pitchId ? (
          <WisprPitchCarousel
            pitchId={post.pitchId}
            onDoubleTap={handleDoubleTap}
          />
        ) : (
          <OpenToWorkPost onDoubleTap={handleDoubleTap} />
        )}

        {/* Big Heart Animation on Double Tap / Like */}
        {showHeartPop && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-30">
            <Heart
              size={90}
              className="fill-white text-white drop-shadow-2xl animate-heart-pop"
            />
          </div>
        )}
      </div>

      {/* Action Bar (Like, Comment, Share, Bookmark) */}
      <div className="px-3.5 pt-3 pb-1.5 flex items-center justify-between text-neutral-800 dark:text-neutral-200">
        <div className="flex items-center gap-4">
          {/* Like Button */}
          <button
            onClick={handleToggleLike}
            className="hover:opacity-70 transition-transform active:scale-125"
            aria-label={isLiked ? 'Unlike' : 'Like'}
          >
            <Heart
              size={24}
              className={`transition-colors duration-150 ${
                isLiked
                  ? 'fill-red-500 text-red-500 scale-105'
                  : 'hover:text-neutral-500 dark:hover:text-neutral-400'
              }`}
            />
          </button>

          {/* Comment Button */}
          <button
            onClick={() => {
              const inputEl = document.getElementById(`comment-input-${post.id}`);
              inputEl?.focus();
            }}
            className="hover:opacity-70 transition-transform active:scale-110"
            aria-label="Comment"
          >
            <MessageCircle size={24} className="hover:text-neutral-500 dark:hover:text-neutral-400" />
          </button>

          {/* Share / Direct Message Button */}
          <button
            onClick={handleShare}
            className="hover:opacity-70 transition-transform active:scale-110"
            aria-label="Share"
          >
            <InstagramDirectIcon size={23} strokeWidth={2} className="hover:text-neutral-500 dark:hover:text-neutral-400" />
          </button>
        </div>

        {/* Bookmark Button */}
        <button
          onClick={handleToggleSave}
          className="hover:opacity-70 transition-transform active:scale-110"
          aria-label={isSaved ? 'Remove from Saved' : 'Save'}
        >
          <Bookmark
            size={24}
            className={isSaved ? 'fill-neutral-900 dark:fill-white text-neutral-900 dark:text-white' : ''}
          />
        </button>
      </div>

      {/* Likes Count */}
      <div className="px-3.5 py-1">
        <p className="text-xs font-bold text-neutral-900 dark:text-white">
          {likesCount === 0 ? (
            <button
              type="button"
              onClick={handleToggleLike}
              className="font-normal text-neutral-500 dark:text-neutral-400 hover:text-neutral-800 dark:hover:text-neutral-200 transition-colors"
            >
              Be the first to <span className="font-semibold text-neutral-800 dark:text-neutral-200 underline underline-offset-2">like this</span>
            </button>
          ) : likesCount === 1 ? (
            '1 like'
          ) : (
            `${likesCount.toLocaleString()} likes`
          )}
        </p>
      </div>

      {/* Caption & Hashtags */}
      <div className="px-3.5 py-1 text-xs text-neutral-800 dark:text-neutral-200 leading-relaxed">
        <span className="font-bold mr-1.5 text-neutral-900 dark:text-white">
          {post.author.username}
        </span>
        <span className="whitespace-pre-line">
          {isCaptionExpanded
            ? post.caption
            : post.caption.slice(0, 115) + (post.caption.length > 115 ? '...' : '')}
        </span>
        {post.caption.length > 115 && (
          <button
            onClick={() => setIsCaptionExpanded(!isCaptionExpanded)}
            className="text-neutral-500 dark:text-neutral-400 text-xs font-normal ml-1 hover:underline"
          >
            {isCaptionExpanded ? 'less' : 'more'}
          </button>
        )}

        {/* Tags */}
        <div className="flex flex-wrap gap-1 mt-1.5">
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="text-[11px] font-medium text-blue-600 dark:text-blue-400 hover:underline cursor-pointer"
            >
              {tag}{' '}
            </span>
          ))}
        </div>
      </div>

      {/* Comments Section */}
      <div className="px-3.5 py-1">
        {!showAllComments && comments.length > 1 && (
          <button
            onClick={() => setShowAllComments(true)}
            className="text-[11px] text-neutral-500 dark:text-neutral-400 font-normal hover:underline block my-0.5"
          >
            View all {comments.length} comments
          </button>
        )}

        {/* Comment list */}
        <div className="space-y-1.5 mt-1">
          {(showAllComments ? comments : comments.slice(0, 2)).map((c) => (
            <div key={c.id} className="flex items-start justify-between text-xs group">
              <div className="pr-4">
                <span className="font-bold mr-1.5 text-neutral-900 dark:text-white">
                  {c.username}
                </span>
                <span className="text-neutral-700 dark:text-neutral-300">{c.text}</span>
                <span className="block text-[10px] text-neutral-400 mt-0.5 font-light">
                  {c.timestamp}
                </span>
              </div>
              <button
                onClick={() => handleToggleCommentLike(c.id)}
                className="text-neutral-400 hover:text-red-500 pt-0.5 transition-colors"
                aria-label="Like comment"
              >
                <Heart
                  size={12}
                  className={c.userLiked ? 'fill-red-500 text-red-500' : ''}
                />
              </button>
            </div>
          ))}
        </div>

        {/* Timestamp */}
        <div className="text-[10px] uppercase tracking-wider text-neutral-400 font-light mt-2 mb-1">
          {post.timestamp}
        </div>
      </div>

      {/* Add Comment Input Form */}
      <form
        onSubmit={handleAddComment}
        className="px-3.5 py-2.5 border-t border-neutral-100 dark:border-neutral-800/80 flex items-center gap-2"
      >
        <button
          type="button"
          onClick={() => setNewComment((prev) => prev + ' 🚀')}
          className="text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-200 transition-colors"
          aria-label="Add emoji"
        >
          <Smile size={18} />
        </button>

        <input
          id={`comment-input-${post.id}`}
          type="text"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Add a comment..."
          className="flex-1 bg-transparent text-xs text-neutral-900 dark:text-white placeholder-neutral-400 focus:outline-none"
        />

        <button
          type="submit"
          disabled={!newComment.trim()}
          className="text-xs font-bold text-blue-500 hover:text-blue-600 disabled:opacity-0 transition-opacity"
        >
          Post
        </button>
      </form>
    </article>
  );
};
