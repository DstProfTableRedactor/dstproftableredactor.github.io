import { defineStore } from 'pinia'

export const useNotificationsStore = defineStore('notifications', () => {
  const notifications = ref([] as Array<{
    id: string,
    text: string,
    type: string,
    duration: number
  }>);

  const addErrorNotification = (notificationText: string, notificationDuration=5) => {
    notifications.value.push({
      id: Math.random().toString(16),
      text: notificationText,
      type: 'error',
      duration: notificationDuration,
    })
  }

  const addSuccessNotification = (notificationText: string, notificationDuration=5) => {
    notifications.value.push({
      id: Math.random().toString(16),
      text: notificationText,
      type: 'success',
      duration: notificationDuration,
    })
  }

  const removeNotification = (id: string) => {
    notifications.value = notifications.value.filter(n => n.id !== id);
  }

  return {
    notifications,
    addErrorNotification,
    addSuccessNotification,
    removeNotification
  }
})