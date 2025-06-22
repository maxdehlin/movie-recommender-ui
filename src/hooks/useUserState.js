import { useMemo } from 'react'

const useUserState = (ratingsCount = 0) => {
  const userState = useMemo(() => {
    if (ratingsCount === 0) {
      return {
        state: 'new',
        title: 'Welcome to the Archive',
        description:
          'Start rating films to unlock personalized AI recommendations',
        progressPercent: 0,
        nextMilestone: 1,
        milestone: 'First rating',
        ctaText: 'Rate Your First Film',
        ctaIcon: '⭐',
        showOnboarding: true,
        showProgress: false,
        showStats: false,
      }
    } else if (ratingsCount < 5) {
      return {
        state: 'progressing',
        title: 'Building Your Taste Profile',
        description: `Rate ${
          5 - ratingsCount
        } more films to unlock full AI recommendations`,
        progressPercent: (ratingsCount / 5) * 100,
        nextMilestone: 5,
        milestone: 'AI recommendations',
        ctaText: 'Continue Rating',
        ctaIcon: '🎯',
        showOnboarding: false,
        showProgress: true,
        showStats: false,
      }
    } else {
      return {
        state: 'established',
        title: 'Your Cinema Dashboard',
        description: 'Explore your personalized film recommendations',
        progressPercent: 100,
        nextMilestone: null,
        milestone: 'Complete',
        ctaText: 'Discover More Films',
        ctaIcon: '🎬',
        showOnboarding: false,
        showProgress: false,
        showStats: true,
      }
    }
  }, [ratingsCount])

  const getProgressSteps = () => [
    {
      number: 1,
      title: 'Rate Films',
      description: "Start by rating movies you've seen",
      completed: ratingsCount >= 1,
      active: ratingsCount === 0,
    },
    {
      number: 2,
      title: 'Build Profile',
      description: 'Rate 5 films to unlock AI analysis',
      completed: ratingsCount >= 5,
      active: ratingsCount > 0 && ratingsCount < 5,
    },
    {
      number: 3,
      title: 'Get Recommendations',
      description: 'Discover personalized film suggestions',
      completed: ratingsCount >= 5,
      active: false,
    },
  ]

  const getMotivationalMessage = () => {
    if (ratingsCount === 0) {
      return 'Every great film journey begins with a single rating'
    } else if (ratingsCount < 5) {
      const remaining = 5 - ratingsCount
      return `Just ${remaining} more rating${
        remaining > 1 ? 's' : ''
      } to unlock AI recommendations!`
    } else {
      return 'Your taste profile is complete. Enjoy your recommendations!'
    }
  }

  const getRecommendationStatus = () => {
    if (ratingsCount === 0) {
      return {
        canGenerate: false,
        message: 'Rate at least 1 film to start getting recommendations',
        buttonText: 'Rate Films First',
      }
    } else if (ratingsCount < 5) {
      return {
        canGenerate: true,
        message: `Basic recommendations available (${ratingsCount}/5 ratings)`,
        buttonText: 'Get Basic Recommendations',
      }
    } else {
      return {
        canGenerate: true,
        message: 'Full AI recommendations unlocked',
        buttonText: 'Generate New Recommendations',
      }
    }
  }

  return {
    ...userState,
    ratingsCount,
    getProgressSteps,
    getMotivationalMessage,
    getRecommendationStatus,
    isNewUser: ratingsCount === 0,
    isProgressingUser: ratingsCount > 0 && ratingsCount < 5,
    isEstablishedUser: ratingsCount >= 5,
  }
}

export default useUserState
