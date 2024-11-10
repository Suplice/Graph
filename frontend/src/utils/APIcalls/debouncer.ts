function debounce<T extends (...args: any[]) => void>(
  func: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timer: ReturnType<typeof setTimeout>;
  return function (...args: Parameters<T>) {
    clearTimeout(timer);
    timer = setTimeout(() => func(...args), delay);
  };
}

const sendStatisticsToBackend = (
  createdGraphs: number,
  uploadedDataSets: number,
  plottedFunctions: number,
  userId: string | undefined,
  token: string | undefined
) => {
  const statistics = {
    createdGraphs: createdGraphs,
    plottedFunctions: plottedFunctions,
    uploadedDataSets: uploadedDataSets,
  };

  console.log(createdGraphs);

  fetch(`${process.env.REACT_APP_API_URL}/statistics/setStatistics/${userId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(statistics),
  })
    .then((res) => res.json())
    .catch((error) => {
      console.error(error);
    });
};

export const debounceSendStatisticsToBackend = debounce(
  sendStatisticsToBackend,
  2000
);
