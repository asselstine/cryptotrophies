const AWARD_TYPE_IMAGE_URLS = [
  '/images/trophy-images/icons-trophy--1024-1024.png',
  '/images/trophy-images/badge-icon--1024-1024.png'
]

const AWARD_TYPE_IMAGE_URLS_SMALL = [
  '/images/trophy-images/icons-trophy--128-128.png',
  '/images/trophy-images/icons-badge--128-128.png'
]

export default function (awardType, size) {
  switch (size) {
    case 'small':
      return AWARD_TYPE_IMAGE_URLS_SMALL[awardType]
    default:
      return AWARD_TYPE_IMAGE_URLS[awardType]
  }
}
