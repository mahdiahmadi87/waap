import React, { useState, useRef, useEffect } from 'react';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import VisibilityIcon from '@mui/icons-material/Visibility';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import FullscreenIcon from '@mui/icons-material/Fullscreen';
import SpeedIcon from '@mui/icons-material/Speed';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import VolumeOffIcon from '@mui/icons-material/VolumeOff';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import DownloadIcon from '@mui/icons-material/Download';

export default function Component() {

  const a = () => {
    const requestOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json', // هدر برای مشخص کردن نوع محتوا
        id:'77d4a1c4-e659-4dca-8fed-95151b57c873'
      },
      mode:'no-cors'
    };
  
    fetch('http://localhost:3000', requestOptions)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        
        return response.json()
        // console.log(response.json());
        
      })
      .then(data => console.log(data))
      .catch(error => console.error('Error:', error));
  };
  a();

  const [isPlaying, setIsPlaying] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [speed, setSpeed] = useState(1);
  const [volume, setVolume] = useState(1);
  const [anchorEl, setAnchorEl] = useState(null);
  const [buffered, setBuffered] = useState([]);
  const videoRef = useRef(null);
  const timelineRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.addEventListener('timeupdate', handleTimeUpdate);
      video.addEventListener('loadedmetadata', handleLoadedMetadata);
      video.addEventListener('progress', handleProgress);
      return () => {
        video.removeEventListener('timeupdate', handleTimeUpdate);
        video.removeEventListener('loadedmetadata', handleLoadedMetadata);
        video.removeEventListener('progress', handleProgress);
      };
    }
  }, []);

  const handleTimeUpdate = () => {
    setCurrentTime(videoRef.current.currentTime);
  };

  const handleLoadedMetadata = () => {
    setDuration(videoRef.current.duration);
  };

  const handleProgress = () => {
    const video = videoRef.current;
    if (!video) return;
    const bufferedRanges = [];
    for (let i = 0; i < video.buffered.length; i++) {
      bufferedRanges.push([video.buffered.start(i), video.buffered.end(i)]);
    }
    setBuffered(bufferedRanges);
  };

  const togglePlay = () => {
    if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleFullscreen = () => {
    if (videoRef.current.requestFullscreen) {
      videoRef.current.requestFullscreen();
    } else if (videoRef.current.mozRequestFullScreen) {
      videoRef.current.mozRequestFullScreen();
    } else if (videoRef.current.webkitRequestFullscreen) {
      videoRef.current.webkitRequestFullscreen();
    } else if (videoRef.current.msRequestFullscreen) {
      videoRef.current.msRequestFullscreen();
    }
  };

  const handleSpeedChange = () => {
    const speeds = [0.5, 1, 1.5, 2];
    const currentIndex = speeds.indexOf(speed);
    const nextIndex = (currentIndex + 1) % speeds.length;
    setSpeed(speeds[nextIndex]);
    videoRef.current.playbackRate = speeds[nextIndex];
  };

  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    videoRef.current.volume = newVolume;
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleDownload = () => {
    const videoSrc = videoRef.current.src;
    const link = document.createElement('a');
    link.href = videoSrc;
    link.download = 'video.mp4';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    handleMenuClose();
  };

  const handleContainerClick = (e) => {
    if (e.target === containerRef.current) {
      const stepSize = 5; // seconds
      videoRef.current.currentTime += stepSize;
    }
  };

  return (
    <div style={{
      maxWidth: '56rem',
      margin: '0 auto',
      padding: '1rem',
      display: 'flex',
      flexDirection: 'column',
      gap: '1rem'
    }}>
      <h1 style={{
        fontSize: '1.875rem',
        fontWeight: 'bold',
        color: 'var(--primary)'
      }}>Lemon Squeeze: A Sour Adventure</h1>
      
      <div 
        ref={containerRef}
        style={{
          position: 'relative',
          aspectRatio: '16 / 9',
          backgroundColor: 'black',
          borderRadius: '0.5rem',
          overflow: 'hidden',
          cursor: 'pointer'
        }}
        onClick={handleContainerClick}
      >
        <video
          ref={videoRef}
          id="mainVideo"
          style={{
            width: '100%',
            height: '100%'
          }}
          poster="/placeholder.svg?height=400&width=600"
        >
          <source src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          background: 'linear-gradient(to top, black, transparent)',
          padding: '1rem'
        }}>
          <div style={{
            position: 'relative',
            marginBottom: '0.5rem',
            height: '0.25rem',
            backgroundColor: 'rgba(255, 255, 255, 0.3)',
            borderRadius: '9999px'
          }} ref={timelineRef}>
            {buffered.map((range, index) => (
              <div
                key={index}
                style={{
                  position: 'absolute',
                  top: 0,
                  height: '100%',
                  backgroundColor: 'rgba(255, 255, 255, 0.5)',
                  borderRadius: '9999px',
                  left: `${(range[0] / duration) * 100}%`,
                  width: `${((range[1] - range[0]) / duration) * 100}%`,
                }}
              />
            ))}
            <div
              style={{
                position: 'absolute',
                top: 0,
                height: '100%',
                backgroundColor: '#3b82f6',
                borderRadius: '9999px',
                width: `${(currentTime / duration) * 100}%`
              }}
            />
            <div
              style={{
                position: 'absolute',
                top: '50%',
                width: '0.75rem',
                height: '0.75rem',
                backgroundColor: '#3b82f6',
                borderRadius: '9999px',
                transform: 'translate(-50%, -50%)',
                boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
                left: `${(currentTime / duration) * 100}%`
              }}
            />
            <input
              type="range"
              min="0"
              max={duration}
              value={currentTime}
              onChange={(e) => {
                videoRef.current.currentTime = e.target.value;
              }}
              style={{
                position: 'absolute',
                top: 0,
                width: '100%',
                height: '100%',
                opacity: 0,
                cursor: 'pointer'
              }}
            />
          </div>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            color: 'white'
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '1rem'
            }}>
              <button
                style={{
                  padding: '0.5rem',
                  borderRadius: '9999px',
                  transition: 'background-color 0.2s'
                }}
                onClick={togglePlay}
              >
                {isPlaying ? <PauseIcon /> : <PlayArrowIcon />}
              </button>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}>
                {volume > 0 ? <VolumeUpIcon /> : <VolumeOffIcon />}
                <div style={{
                  position: 'relative',
                  width: '5rem',
                  height: '0.25rem',
                  backgroundColor: 'rgba(255, 255, 255, 0.3)',
                  borderRadius: '9999px'
                }}>
                  <div
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      height: '100%',
                      backgroundColor: '#3b82f6',
                      borderRadius: '9999px',
                      width: `${volume * 100}%`
                    }}
                  />
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.1"
                    value={volume}
                    onChange={handleVolumeChange}
                    style={{
                      position: 'absolute',
                      top: 0,
                      width: '100%',
                      height: '100%',
                      opacity: 0,
                      cursor: 'pointer'
                    }}
                  />
                </div>
              </div>
              <span style={{ fontSize: '0.875rem' }}>{formatTime(currentTime)} / {formatTime(duration)}</span>
            </div>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '1rem'
            }}>
              <button
                style={{
                  padding: '0.5rem',
                  borderRadius: '9999px',
                  transition: 'background-color 0.2s',
                  display: 'flex',
                  alignItems: 'center'
                }}
                onClick={handleSpeedChange}
              >
                <SpeedIcon style={{ marginRight: '0.25rem' }} />
                <span style={{ fontSize: '0.75rem' }}>{speed}x</span>
              </button>
              <button
                style={{
                  padding: '0.5rem',
                  borderRadius: '9999px',
                  transition: 'background-color 0.2s'
                }}
                onClick={handleFullscreen}
              >
                <FullscreenIcon />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '0.25rem'
        }}>
          <h2 style={{
            fontSize: '1.5rem',
            fontWeight: 600,
            color: 'var(--secondary)'
          }}>Lemon Squeeze: A Sour Adventure</h2>
          <p style={{
            fontSize: '0.875rem',
            color: 'var(--muted-foreground)'
          }}>Uploaded on June 15, 2023</p>
        </div>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '1rem'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.25rem'
          }}>
            <VisibilityIcon style={{ color: 'var(--muted-foreground)' }} />
            <span style={{
              fontSize: '0.875rem',
              color: 'var(--muted-foreground)'
            }}>10,432 views</span>
          </div>
          <button
            style={{
              color: isSaved ? 'var(--primary)' : 'var(--muted-foreground)',
              transition: 'color 0.2s'
            }}
            onClick={() => setIsSaved(!isSaved)}
          >
            <BookmarkIcon />
          </button>
          <button 
            style={{
              color: 'var(--muted-foreground)',
              transition: 'color 0.2s'
            }}
            onClick={handleMenuOpen}
          >
            <MoreVertIcon />
          </button>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
          >
            <MenuItem onClick={handleDownload}>
              <DownloadIcon style={{ marginRight: '0.5rem' }} /> Download
            </MenuItem>
          </Menu>
        </div>
      </div>

      <p style={{ color: 'var(--muted-foreground)' }}>
        "Lemon Squeeze: A Sour Adventure" takes you on a zesty journey through the world of citrus. Follow our protagonist, Lenny the Lemon, as he navigates the perils of the fruit bowl, dodging the sweet fruits and teaming up with his tart comrades. This animated short is a rollercoaster of flavors that will make your taste buds tingle and your funny bone tickle.
      </p>

      <div style={{
        backgroundColor: 'var(--muted)',
        padding: '1rem',
        borderRadius: '0.5rem'
      }}>
        <h3 style={{
          fontWeight: 600,
          marginBottom: '0.5rem',
          color: 'var(--secondary)'
        }}>Film Details</h3>
        <ul style={{
          
          listStyleType: 'disc',
          listStylePosition: 'inside',
          display: 'flex',
          flexDirection: 'column',
          gap: '0.25rem',
          fontSize: '0.875rem',
          color: 'var(--muted-foreground)'
        }}>
          <li>Director: Zesty Filmmaker</li>
          <li>Release Date: June 1, 2023</li>
          <li>Duration: 15 minutes</li>
          <li>Genre: Animation, Comedy, Family</li>
          <li>Rating: G (General Audience)</li>
          <li>Production: Sour Studios</li>
        </ul>
      </div>

      <div style={{
        backgroundColor: 'rgba(var(--secondary), 0.1)',
        padding: '1rem',
        borderRadius: '0.5rem'
      }}>
        <h3 style={{
          fontWeight: 600,
          marginBottom: '0.5rem',
          color: 'var(--secondary)'
        }}>Sour Facts</h3>
        <ul style={{
          listStyleType: 'disc',
          listStylePosition: 'inside',
          display: 'flex',
          flexDirection: 'column',
          gap: '0.25rem',
          fontSize: '0.875rem',
          color: 'var(--muted-foreground)'
        }}>
          <li>The animation team consumed over 1000 lemons for inspiration during production.</li>
          <li>The character Lenny's expressions were modeled after real people tasting extremely sour candies.</li>
          <li>A custom "sour" color palette was developed specifically for this film.</li>
          <li>The film's soundtrack features a symphony played entirely on lemon-based instruments.</li>
        </ul>
      </div>
    </div>
  );
}