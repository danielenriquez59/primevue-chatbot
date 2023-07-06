export async function callOpenai(model, messages, temperature, max_tokens) {
  const runtimeConfig = useRuntimeConfig();
  return new Promise((resolve, reject) => {
    $.ajax({
      url: "https://api.openai.com/v1/chat/completions",
      type: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ` + runtimeConfig.public.OPENAI_APIKEY,
      },
      data: JSON.stringify({
        model: model,
        messages: messages,
        temperature: temperature,
        max_tokens: max_tokens,
      }),
      success: (response) => {
        const result = {
          answer: response.choices[0].message.content,
          finish_reason: response.choices[0].finish_reason,
          total_tokens: response.usage.total_tokens,
        };
        resolve(result);
      },
      error: function (xhr) {
        reject(xhr.responseText);
      },
    });
  });
}
