// pages/api/socket.js
import { Server } from 'socket.io';

const SocketHandler = (req, res) => {
  if (res.socket.server.io) {
    console.log('Socket is already running');
  } else {
    console.log('Socket is initializing');
    const io = new Server(res.socket.server);
    res.socket.server.io = io;

    io.on('connection', socket => {
      console.log(`Client connected: ${socket.id}`);
      
      socket.on('start-debate', async (data) => {
        try {
          // Replace with your actual n8n webhook URL
          const n8nWebhookUrl = process.env.N8N_WEBHOOK_URL || 'http://your-n8n-instance/webhook/debate';
          
          // Send the initial request to n8n
          const response = await fetch(n8nWebhookUrl, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ userPrompt: data.userPrompt }),
          });

          if (!response.ok) {
            throw new Error(`N8n webhook responded with status: ${response.status}`);
          }

          const debateData = await response.json();
          
          // Emit the debate topic and first round responses
          socket.emit('debate-started', {
            topic: debateData.debate_result.topic,
            round: 1,
            supporting: debateData.debate_result.supporting_arguments,
            opposing: debateData.debate_result.opposing_arguments,
          });

          // Check if the debate has timed out
          if (debateData.timedOut) {
            socket.emit('debate-ended', { 
              reason: 'A bot did not respond within 20 seconds.' 
            });
            return;
          }

          // In a real implementation, you would set up continuing rounds here
          // For this demo, we'll simulate multiple rounds with a setTimeout
          
          // Simulate 3 rounds of debate
          const totalRounds = 3;
          let currentRound = 1;

          const simulateNextRound = () => {
            currentRound++;
            
            if (currentRound <= totalRounds) {
              // Simulate a delay for the bots to respond
              setTimeout(() => {
                // Randomly decide if a timeout should occur
                const randomTimeout = Math.random() < 0.2;
                
                if (randomTimeout) {
                  socket.emit('debate-ended', { 
                    reason: 'A bot did not respond within 20 seconds.'
                  });
                } else {
                  // Generate some mock debate content for this round
                  socket.emit('debate-round', {
                    round: currentRound,
                    supporting: {
                      stance: "Support",
                      points: [
                        {
                          title: `Support Point ${currentRound}-1`,
                          description: `This is a supporting point for round ${currentRound}.`
                        },
                        {
                          title: `Support Point ${currentRound}-2`,
                          description: `This is another supporting point for round ${currentRound}.`
                        }
                      ]
                    },
                    opposing: {
                      position: "Opposing",
                      points: [
                        {
                          point: `Opposition Point ${currentRound}-1`,
                          detail: `This is an opposing point for round ${currentRound}.`
                        },
                        {
                          point: `Opposition Point ${currentRound}-2`,
                          detail: `This is another opposing point for round ${currentRound}.`
                        }
                      ]
                    }
                  });
                  
                  simulateNextRound();
                }
              }, 5000); // 5 second delay between rounds
            } else {
              // End the debate after all rounds
              socket.emit('debate-ended', { 
                reason: 'Debate completed successfully with all rounds.' 
              });
            }
          };
          
          // Start the simulation of additional rounds
          simulateNextRound();
          
        } catch (error) {
          console.error('Error in debate process:', error);
          socket.emit('debate-error', { error: error.message });
        }
      });

      socket.on('disconnect', () => {
        console.log('Client disconnected');
      });
    });
  }
  res.end();
};

export default SocketHandler;