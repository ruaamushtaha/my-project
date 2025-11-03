/**
 * =============================================================================
 * STAR RATING COMPONENT
 * =============================================================================
 * 
 * Interactive 5-star rating component with smooth animations and hover effects.
 * Provides visual feedback through scale animations and color transitions.
 * 
 * Features:
 * - Hover preview before clicking
 * - Smooth scale animations on interaction
 * - Accessible with keyboard support
 * - Dark mode compatible
 * - RTL layout support
 * 
 * @component
 * @category UI Components
 * =============================================================================
 */

import React, { useState } from 'react';
import { motion } from 'framer-motion';

/**
 * StarRating Component
 * 
 * @param {Object} props - Component props
 * @param {number} props.rating - Current rating value (0-5)
 * @param {Function} props.onRatingChange - Callback when rating changes
 * @param {boolean} [props.readonly=false] - Whether rating is read-only
 * @param {string} [props.size='2xl'] - Size of stars (text-* class)
 * 
 * @returns {JSX.Element} Rendered star rating component
 * 
 * @example
 * <StarRating
 *   rating={currentRating}
 *   onRatingChange={(newRating) => setRating(newRating)}
 * />
 */
export default function StarRating({ 
  rating, 
  onRatingChange, 
  readonly = false,
  size = '2xl' 
}) {
  // Track which star is currently being hovered
  const [hoveredStar, setHoveredStar] = useState(0);

  /**
   * Handles star click
   * Updates rating via callback
   * 
   * @param {number} star - Star number that was clicked (1-5)
   */
  const handleClick = (star) => {
    if (!readonly) {
      onRatingChange(star);
    }
  };

  /**
   * Handles mouse entering a star
   * Shows hover preview
   * 
   * @param {number} star - Star number being hovered
   */
  const handleMouseEnter = (star) => {
    if (!readonly) {
      setHoveredStar(star);
    }
  };

  /**
   * Handles mouse leaving star area
   * Clears hover preview
   */
  const handleMouseLeave = () => {
    if (!readonly) {
      setHoveredStar(0);
    }
  };

  /**
   * Determines which rating to display
   * Shows hover preview if hovering, otherwise shows actual rating
   */
  const displayRating = hoveredStar || rating;

  /**
   * Animation variants for star interactions
   */
  const starVariants = {
    // Initial state
    initial: { scale: 1 },
    
    // When hovering
    hover: { 
      scale: 1.2,
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 10
      }
    },
    
    // When clicking
    tap: { 
      scale: 0.9,
      transition: {
        duration: 0.1
      }
    },
    
    // When selected
    selected: {
      scale: 1.1,
      transition: {
        type: 'spring',
        stiffness: 200,
        damping: 10
      }
    }
  };

  return (
    <div 
      className="flex gap-1 justify-center"
      role="radiogroup"
      aria-label="تقييم بالنجوم"
    >
      {[1, 2, 3, 4, 5].map((star) => {
        const isActive = displayRating >= star;
        const isSelected = rating >= star;
        
        return (
          <motion.button
            key={star}
            type="button"
            onClick={() => handleClick(star)}
            onMouseEnter={() => handleMouseEnter(star)}
            onMouseLeave={handleMouseLeave}
            variants={starVariants}
            initial="initial"
            whileHover={!readonly ? "hover" : undefined}
            whileTap={!readonly ? "tap" : undefined}
            animate={isSelected ? "selected" : "initial"}
            className={`
              focus:outline-none 
              focus:ring-2 
              focus:ring-primary 
              focus:ring-offset-2 
              rounded
              ${readonly ? 'cursor-default' : 'cursor-pointer'}
              transition-colors duration-200
            `}
            aria-label={`تقييم ${star} نجوم`}
            aria-pressed={isSelected}
            disabled={readonly}
          >
            <motion.span
              className={`
                text-${size}
                transition-colors duration-200
                ${isActive 
                  ? 'text-yellow-500 dark:text-yellow-400' 
                  : 'text-gray-300 dark:text-gray-600'
                }
              `}
              style={{
                // Add text shadow for better visibility
                textShadow: isActive 
                  ? '0 2px 4px rgba(234, 179, 8, 0.3)' 
                  : 'none'
              }}
            >
              ★
            </motion.span>
          </motion.button>
        );
      })}
    </div>
  );
}

/**
 * PropTypes documentation
 * 
 * StarRating.propTypes = {
 *   rating: PropTypes.number.isRequired,
 *   onRatingChange: PropTypes.func.isRequired,
 *   readonly: PropTypes.bool,
 *   size: PropTypes.string
 * };
 */
