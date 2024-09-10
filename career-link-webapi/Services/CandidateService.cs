
using System.Collections.Generic;
using System.Linq;

public class CandidateService
{
    private readonly MyAppContext _context;

    public CandidateService(MyAppContext context)
    {
        _context = context;
    }

    public List<Candidate> GetAllCandidates()
    {
        return _context.Candidates.ToList();
    }

    public Candidate GetCandidateById(int id)
    {
        return _context.Candidates.FirstOrDefault(cp => cp.CandidateId == id);
    }

    public void AddCandidate(Candidate Candidate)
    {
        _context.Candidates.Add(Candidate);
        _context.SaveChanges();
    }

    public void DeleteCandidate(int id)
    {
        var Candidate = _context.Candidates.FirstOrDefault(cp => cp.CandidateId == id);
        if (Candidate != null)
        {
            _context.Candidates.Remove(Candidate);
            _context.SaveChanges();
        }
    }
}
