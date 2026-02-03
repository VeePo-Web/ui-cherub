/**
 * Calendar utilities for generating ICS files
 * Used to help users save their discount code reminder for launch
 */

function formatICSDate(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}${month}${day}`;
}

function formatICSDateTime(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');
  return `${year}${month}${day}T${hours}${minutes}${seconds}`;
}

function escapeICSText(text: string): string {
  return text
    .replace(/\\/g, '\\\\')
    .replace(/;/g, '\\;')
    .replace(/,/g, '\\,')
    .replace(/\n/g, '\\n');
}

export interface LaunchReminderParams {
  couponCode: string;
  queuePosition: number;
  selectedTier: string;
}

export function generateLaunchReminderICS(params: LaunchReminderParams): string {
  const { couponCode, queuePosition, selectedTier } = params;
  
  // Calculate date 3 months from now for placeholder launch
  const launchDate = new Date();
  launchDate.setMonth(launchDate.getMonth() + 3);
  launchDate.setHours(10, 0, 0, 0); // 10 AM
  
  const endDate = new Date(launchDate);
  endDate.setHours(11, 0, 0, 0); // 1 hour event
  
  const tierName = selectedTier 
    ? selectedTier.charAt(0).toUpperCase() + selectedTier.slice(1) 
    : "Gaming";
  
  const description = escapeICSText(
    `🎮 Gaming PC Subscription - Calgary Launch\\n\\n` +
    `YOUR DISCOUNT CODE: ${couponCode}\\n` +
    `Queue Position: #${queuePosition}\\n` +
    `Tier: ${tierName}\\n\\n` +
    `Use this code for 10% off your first 3 months!\\n\\n` +
    `Visit the website to complete your subscription.`
  );
  
  const summary = escapeICSText(`Gaming PC Subscription Launch - Use Code: ${couponCode}`);
  
  // Generate unique ID
  const uid = `${Date.now()}-${couponCode}@gamingpc.subscription`;
  const timestamp = formatICSDateTime(new Date());
  
  const icsContent = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Gaming PC Subscription//Calgary Launch//EN',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'BEGIN:VEVENT',
    `UID:${uid}`,
    `DTSTAMP:${timestamp}`,
    `DTSTART:${formatICSDateTime(launchDate)}`,
    `DTEND:${formatICSDateTime(endDate)}`,
    `SUMMARY:${summary}`,
    `DESCRIPTION:${description}`,
    'STATUS:CONFIRMED',
    'SEQUENCE:0',
    'BEGIN:VALARM',
    'TRIGGER:-P1D',
    'ACTION:DISPLAY',
    `DESCRIPTION:Gaming PC Subscription launches tomorrow! Your code: ${couponCode}`,
    'END:VALARM',
    'BEGIN:VALARM',
    'TRIGGER:-PT1H',
    'ACTION:DISPLAY',
    `DESCRIPTION:Gaming PC Subscription launches in 1 hour! Your code: ${couponCode}`,
    'END:VALARM',
    'END:VEVENT',
    'END:VCALENDAR'
  ].join('\r\n');

  return icsContent;
}

export function downloadICS(content: string, filename: string): void {
  const blob = new Blob([content], { type: 'text/calendar;charset=utf-8' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(link.href);
}

export function downloadLaunchReminder(params: LaunchReminderParams): void {
  const icsContent = generateLaunchReminderICS(params);
  downloadICS(icsContent, `gaming-pc-launch-reminder-${params.couponCode}.ics`);
}
