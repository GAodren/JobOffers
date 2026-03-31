import { useState, useEffect, useMemo } from "react";

export function useJobs() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("/jobs.json")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch jobs");
        return res.json();
      })
      .then((data) => {
        setJobs(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const getUnswipedJobs = useMemo(() => {
    return (swipedIds) => {
      return jobs
        .filter((job) => !swipedIds.includes(job.id))
        .sort((a, b) => (b.score || 0) - (a.score || 0));
    };
  }, [jobs]);

  const getJobById = useMemo(() => {
    const map = new Map(jobs.map((j) => [j.id, j]));
    return (id) => map.get(id);
  }, [jobs]);

  const getJobsByIds = useMemo(() => {
    return (ids) => ids.map((id) => jobs.find((j) => j.id === id)).filter(Boolean);
  }, [jobs]);

  return {
    jobs,
    loading,
    error,
    getUnswipedJobs,
    getJobById,
    getJobsByIds,
  };
}
