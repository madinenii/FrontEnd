// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const PanelistPage = () => {
//   const [ideas, setIdeas] = useState([]);
//   const [ideaIds,setIdeaIds]=useState([]);
//   const [selectedIdea, setSelectedIdea] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [acceptDisabled, setAcceptDisabled] = useState(false);
//   const [rejectDisabled, setRejectDisabled] = useState(false);

//   useEffect(() => {
//     const fetchIdeas = async () => {
//       try {
//         const response = await axios.get('/panelists/submitted-ideas');
//         if (Array.isArray(response.data)) {
//           setIdeas(response.data);
//           const extractedIdeaIds = response.data.map(idea => idea.ideaId);
//           setIdeaIds(extractedIdeaIds);
          

//         } else {
//           throw new Error('Invalid data format received from the server');
//         }
//         setLoading(false);
//       } catch (error) {
//         setError(error.message);
//         setLoading(false);
//       }
//     };

//     fetchIdeas();
//   }, []);

//   const handleRowClick = (idea) => {
//     setSelectedIdea(idea);
//   };

//   const handleCloseDialog = () => {
//     setSelectedIdea(null);
//   };

//   const handleAction = async (status) => {
//     try {
//       if (selectedIdea) {
//         if (status === 'accept') {
//           setAcceptDisabled(true);
//         } else if (status === 'reject') {
//           setRejectDisabled(true);
//         }
//         const response = await axios.put('/accept-idea/{ideaId}', {
//           //ideaId: ideas[ideaId],
//           status: status
//         });
//         // Assuming the response from the server indicates success
//         // You may want to handle errors as well
//         console.log('Action performed successfully:', response.data);
//       }
//     } catch (error) {
//       console.error('Error performing action:', error);
//     }
//   };

//   return (
//     <div>
//       <h1>Panelist Page</h1>
//       {loading ? (
//         <p>Loading...</p>
//       ) : error ? (
//         <p>Error: {error}</p>
//       ) : (
//         <div>
//           {selectedIdea && (
//             <Dialog
//               idea={selectedIdea}
//               onClose={handleCloseDialog}
//               onAccept={() => handleAction('accept')}
//               onReject={() => handleAction('reject')}
//               acceptDisabled={acceptDisabled}
//               rejectDisabled={rejectDisabled}
//             />
//           )}
//           {ideas.length > 0 ? (
//             ideas.map((idea) => (
//               <div key={idea.id} onClick={() => handleRowClick(idea)} style={{cursor: 'pointer'}}>
//                 <Card idea={idea} />
//               </div>
//             ))
//           ) : (
//             <p>No ideas available</p>
//           )}
//         </div>
//       )}
//     </div>
//   );
// };

// const Card = ({ idea }) => {
//   return (
//     <div style={{ border: '1px solid #ccc', padding: '10px', margin: '10px 0', borderRadius: '5px' }}>
//       <h2>{idea.ideaTitle}</h2>
//       <p>{idea.ideaDescription}</p>
//       <p><strong>Domain:</strong> {idea.ideaDomain}</p>
//       <p><strong>Submission URL:</strong> <a href={idea.submissionUrl} target="_blank" rel="noopener noreferrer">{idea.submissionUrl}</a></p>
//     </div>
//   );
// };

// const Dialog = ({ idea, onClose, onAccept, onReject, acceptDisabled, rejectDisabled }) => {
//   return (
//     <div style={{ position: 'fixed', top: '0', left: '0', width: '100%', height: '100%', background: 'rgba(0, 0, 0, 0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
//       <div style={{ background: '#fff', padding: '20px', borderRadius: '5px' }}>
//         <h2>{idea.ideaTitle}</h2>
//         <p>{idea.ideaDescription}</p>
//         <p><strong>Domain:</strong> {idea.domain}</p>
//         <p><strong>Submission URL:</strong> <a href={idea.submissionUrl} target="_blank" rel="noopener noreferrer">{idea.submissionUrl}</a></p>
//         <button onClick={onAccept} disabled={acceptDisabled}>Accept</button>
//         <button onClick={onReject} disabled={rejectDisabled}>Reject</button>
//         <button onClick={onClose}>Close</button>
//       </div>
//     </div>
//   );
// };

// export default PanelistPage;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
 
const PanelistPage = () => {
  const [ideas, setIdeas] = useState([]);
  const [selectedIdea, setSelectedIdea] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [acceptDisabled, setAcceptDisabled] = useState(false);
  const [rejectDisabled, setRejectDisabled] = useState(false);
 
  useEffect(() => {
    const fetchIdeas = async () => {
      try {
        const response = await axios.get('/panelists/submitted-ideas');
        if (Array.isArray(response.data)) {
          setIdeas(response.data);
        } else {
          throw new Error('Invalid data format received from the server');
        }
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };
 
    fetchIdeas();
  }, []);
 
  const handleRowClick = (idea) => {
    setSelectedIdea(idea);
  };
 
  const handleCloseDialog = () => {
    setSelectedIdea(null);
    setAcceptDisabled(false);
    setRejectDisabled(false);
  };
 
  const handleAction = async (status) => {
    try {
      if (selectedIdea) {
        if (status === 'accept') {
          setAcceptDisabled(true);
          setRejectDisabled(true);
        } else if (status === 'reject') {
          setAcceptDisabled(true);
          setRejectDisabled(true);
        }
        const response = await axios.put(`/panelists/accept-idea/${selectedIdea.ideaId}`, {
          status: status
        });
 
        // Assuming the response from the server indicates success
        // You may want to handle errors as well
        console.log('Action performed successfully:', response.data);
 
        // Remove the idea from the list after successful action
        setIdeas(prevIdeas => prevIdeas.filter(idea => idea.ideaId !== selectedIdea.ideaId));
      }
    } catch (error) {
      console.error('Error performing action:', error);
    }
  };
 
  return (
<div>
<h1>Panelist Page</h1>
      {loading ? (
<p>Loading...</p>
      ) : error ? (
<p>Error: {error}</p>
      ) : (
<div>
          {selectedIdea && (
<Dialog
              idea={selectedIdea}
              onClose={handleCloseDialog}
              onAccept={() => handleAction('accept')}
              onReject={() => handleAction('reject')}
              acceptDisabled={acceptDisabled}
              rejectDisabled={rejectDisabled}
            />
          )}
          {ideas.length > 0 ? (
            ideas.map((idea) => (
<div key={idea.ideaId} onClick={() => handleRowClick(idea)} style={{ cursor: 'pointer' }}>
<Card idea={idea} />
</div>
            ))
          ) : (
<p>No ideas available</p>
          )}
</div>
      )}
</div>
  );
};
 
const Card = ({ idea }) => {
  return (
<div style={{ border: '1px solid #ccc', padding: '10px', margin: '10px 0', borderRadius: '5px' }}>
<h2>{idea.ideaTitle}</h2>
<p>{idea.ideaDescription}</p>
<p><strong>Domain:</strong> {idea.ideaDomain}</p>
<p><strong>Submission URL:</strong> <a href={idea.submissionUrl} target="_blank" rel="noopener noreferrer">{idea.submissionUrl}</a></p>
</div>
  );
};
 
const Dialog = ({ idea, onClose, onAccept, onReject, acceptDisabled, rejectDisabled }) => {
  return (
<div style={{ position: 'fixed', top: '0', left: '0', width: '100%', height: '100%', background: 'rgba(0, 0, 0, 0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
<div style={{ background: '#fff', padding: '20px', borderRadius: '5px' }}>
<h2>{idea.ideaTitle}</h2>
<p>{idea.ideaDescription}</p>
<p><strong>Domain:</strong> {idea.ideaDomain}</p>
<p><strong>Submission URL:</strong> <a href={idea.submissionUrl} target="_blank" rel="noopener noreferrer">{idea.submissionUrl}</a></p>
<button onClick={onAccept} disabled={acceptDisabled}>Accept</button>
<button onClick={onReject} disabled={rejectDisabled}>Reject</button>
<button onClick={onClose}>Close</button>
</div>
</div>
  );
};
 
export default PanelistPage;

