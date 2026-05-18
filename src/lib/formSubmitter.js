import { FORM_CONFIG } from '../config/forms';

/**
 * Centrally submits form data based on the active provider configured in src/config/forms.js.
 * Supports Web3Forms, Formspree, and FormSubmit.
 * 
 * @param {Object} payload The key-value fields to submit.
 * @returns {Promise<boolean>} True if submission was successful, false otherwise.
 */
export const submitForm = async (payload) => {
  const { provider, accessKey } = FORM_CONFIG;
  
  let url = '';
  let finalPayload = { ...payload };

  let activeProvider = provider;
  
  // Smart fallback: If provider is web3forms or formspree but accessKey is still an email, fall back to formsubmit
  if ((provider === 'web3forms' || provider === 'formspree') && accessKey.includes('@')) {
    console.warn(`[formSubmitter] "${provider}" requires a valid access key/ID. Falling back to "formsubmit" since accessKey looks like an email.`);
    activeProvider = 'formsubmit';
  }

  // Set up Web3Forms parameters
  if (activeProvider === 'web3forms') {
    url = 'https://api.web3forms.com/submit';
    finalPayload.access_key = accessKey;
    // Map _subject to subject for Web3Forms standard compliance
    if (payload._subject) {
      finalPayload.subject = payload._subject;
      delete finalPayload._subject;
    }
  } 
  // Set up Formspree parameters
  else if (activeProvider === 'formspree') {
    url = `https://formspree.io/f/${accessKey}`;
    if (payload._subject) {
      finalPayload.subject = payload._subject;
      delete finalPayload._subject;
    }
  } 
  // Set up FormSubmit parameters
  else {
    url = `https://formsubmit.co/ajax/${accessKey}`;
  }

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: { 
        "Content-Type": "application/json", 
        "Accept": "application/json" 
      },
      body: JSON.stringify(finalPayload)
    });

    if (response.ok) {
      const result = await response.json();
      // Web3Forms returns success inside a boolean field 'success'
      if (activeProvider === 'web3forms') {
        return result.success === true;
      }
      return true;
    }
    
    return false;
  } catch (err) {
    console.error("Centralized form submission error:", err);
    return false;
  }
};
