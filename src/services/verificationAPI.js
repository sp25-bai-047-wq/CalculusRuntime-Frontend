import { verifyCourseCompletion } from "./courseVerificationService";

export async function runBackgroundVerification(userProgress, courseData) {
  await new Promise((resolve) => setTimeout(resolve, 300));

  if (!courseData || !userProgress) {
    return {
      status: 'error',
      verified: false,
      message: 'Invalid parameters provided.'
    };
  }

  const result = verifyCourseCompletion(userProgress, courseData);

  if (!result.verified) {
    return {
      status: 'fail',
      ...result,
      message: 'Course completion requirements are not fully met.'
    };
  }

  const timestamp = new Date().toISOString();
  const rawTokenString = `${courseData.id}-${userProgress.userId || 'user'}-${timestamp}`;
  const verificationToken = btoa(rawTokenString); 

  return {
    status: 'success',
    ...result,
    completedAt: timestamp,
    verificationToken,
    message: 'Course completion successfully verified.'
  };
}