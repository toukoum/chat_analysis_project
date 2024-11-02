import numpy as np

def calculate_toxicity_distribution(scores, bins):
    """
     Based on all the toxicity scores, calculate the distribution of toxicity
    
		"""
    hist, bin_edges = np.histogram(scores, bins)
        
    return {
        "histogram": hist.tolist(),
        "bin_edges": bin_edges.tolist(),
        "average": np.mean(scores),
				"median": np.median(scores),
    }
