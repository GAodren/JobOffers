import { useState, useEffect, useMemo } from "react";
import { parseApplicants } from "../utils/helpers";

export function useJobs() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const [scoreFilter, setScoreFilter] = useState("all");
  const [companyFilter, setCompanyFilter] = useState("all");
  const [sort, setSort] = useState("newest");

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

  const companies = useMemo(() => {
    const set = new Set(jobs.map((j) => j.entreprise));
    return [...set].sort();
  }, [jobs]);

  const filtered = useMemo(() => {
    let result = [...jobs];

    // Keyword search
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (job) =>
          job.titre?.toLowerCase().includes(q) ||
          job.entreprise?.toLowerCase().includes(q) ||
          job.stack?.toLowerCase().includes(q) ||
          job.commentaire?.toLowerCase().includes(q) ||
          job.localisation?.toLowerCase().includes(q)
      );
    }

    // Score filter
    if (scoreFilter !== "all") {
      const min = parseInt(scoreFilter, 10);
      result = result.filter((job) => job.score >= min);
    }

    // Company filter
    if (companyFilter !== "all") {
      result = result.filter((job) => job.entreprise === companyFilter);
    }

    // Sort
    switch (sort) {
      case "newest":
        result.sort(
          (a, b) => new Date(b.date_ajout || 0) - new Date(a.date_ajout || 0)
        );
        break;
      case "score":
        result.sort((a, b) => (b.score || 0) - (a.score || 0));
        break;
      case "applicants":
        result.sort(
          (a, b) =>
            parseApplicants(a.nb_candidats) - parseApplicants(b.nb_candidats)
        );
        break;
    }

    return result;
  }, [jobs, search, scoreFilter, companyFilter, sort]);

  return {
    jobs,
    filtered,
    loading,
    error,
    search,
    setSearch,
    scoreFilter,
    setScoreFilter,
    companyFilter,
    setCompanyFilter,
    sort,
    setSort,
    companies,
  };
}
