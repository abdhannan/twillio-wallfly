import React, { Component } from 'react';
import '../../styles/App.css';
import { Container, Grid, Typography, BottomNavigation, BottomNavigationAction } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { Mic, MicOff, Videocam, VideocamOff, ScreenShare, StopScreenShare } from '@material-ui/icons';
import Typical from 'react-typical'
import TwilioService from '../../services/services';
import { Redirect } from 'react-router-dom';
const { connect, createLocalVideoTrack, createLocalTracks, LocalVideoTrack } = require('twilio-video');
class Rooms extends Component {

    constructor() {
        super();
        this.state = {
            isConnected: false,
            isParticipantConnected: false,
            isLeafingRoom: false,
            roomName: "",
            username: "",
            roomSID: "",
            currentRoom: "",
            screenWidth: window.innerWidth,
            shareScreen: "",
            leftRoom: false,
            columnNum: 0
        }
        this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
        this.videoconference = React.createRef();
        this.participantconference = React.createRef();
    }

    componentDidMount() {
        
        this.updateWindowDimensions();
        window.addEventListener('resize', this.updateWindowDimensions);

        var param = new URLSearchParams(this.props.location.search);
        this.setState({ roomName: param.get('room_name'), username: param.get('username') });

        TwilioService.access_token(param.get('username')).then(response => {
            this.connectToRoom(response.data, this.state.roomName);
        });
    }

    updateWindowDimensions() {
        this.setState({ screenWidth: window.innerWidth });
    }

    connectToRoom = function (access_token, room_name) {

        createLocalTracks({
            audio: true,
            video: true,
        }).then(localtrack => {
            connect( access_token, { 
                name:room_name,
                tracks: localtrack,
            }).then(room => {
                var tracks = Array.from((room.localParticipant.tracks.values()));

                tracks.forEach(element => {
                    this.setState({ isConnected: true, columnNum: 1 });
                    
                    const participant = document.createElement('div');
                    participant.setAttribute(`id`, `Participants`);
                    participant.appendChild(element.attach());
                    this.videoconference.current.appendChild(participant);

                    var user = document.querySelectorAll('div#Participants video');
                    for(let i=0; i<user.length; i++)
                    {
                        user[i].parentElement.className = 'App-Col' + this.state.columnNum;
                    }

                    // Remove empty component after leave meeting
                    var empty = document.querySelectorAll('div#Participants');
                    for(let index=0; index<empty.length; index++)
                    {
                        if(empty[index].innerHTML === "")
                        {
                            empty[index].remove();
                        }
                    }

                });

                this.setState({ 
                    roomSID: room.sid,
                    currentRoom: room
                });

                this.handleParticipantWasInRoom();

                this.handleParticipantConnect();
                
                this.handleParticipantDisconnect();

                
                room.participants.forEach(participant => {
                    participant.tracks.forEach(publication => {
                        
                        // Handle mute media
                        if (publication.isSubscribed) {
                            this.handleTrackDisabled(publication.track);
                        }

                    });
                

                    /** Handle video disable */
                    participant.on('trackDisabled', track => {
                        console.log(participant.identity + " Disabled Video");
                    });
                    
                    /** Handle video enable */
                    participant.on('trackEnabled', track => {
                        console.log(participant.identity + " Enabled Video");
                    });

                });
            });
        });
    }

    handleParticipantWasInRoom() {
        this.state.currentRoom.participants.forEach(participant => {
            participant.on('trackSubscribed', track => {
                this.setState({ 
                    columnNum : parseInt(1) + parseInt(this.state.currentRoom.participants.size),
                    isConnected: true
                });

                const participant = document.createElement('div');
                participant.setAttribute(`id`, `Participants`);
                participant.appendChild(track.attach());
                this.videoconference.current.appendChild(participant);

                var user = document.querySelectorAll('div#Participants video');
                for(let i=0; i<user.length; i++)
                {
                    user[i].parentElement.className = 'App-Col' + this.state.columnNum;
                }

                // Remove empty component after leave meeting
                var empty = document.querySelectorAll('div#Participants');
                for(let index=0; index<empty.length; index++)
                {
                    if(empty[index].innerHTML === "")
                    {
                        empty[index].remove();
                    }
                }

            });
        });
    }

    /** Handle participant connect to room */
    handleParticipantConnect() {
        this.state.currentRoom.on('participantConnected', participant => {
            var item = {                    
                sid: participant.sid,
                name: participant.identity,
                isVideoMuted: false,
                isAudioMuted: false
            }
     
            participant.tracks.forEach(publication => {                
                if (publication.isSubscribed) {
                    this.setState({
                        columnNum : parseInt(1) + parseInt(this.state.currentRoom.participants.size),
                        isConnected: true,
                    });

                    const track = publication.track;
                    const participant = document.createElement('div');
                    participant.setAttribute(`id`, `Participants`);
                    participant.appendChild(track.attach());
                    this.videoconference.current.appendChild(participant);

                    var user = document.querySelectorAll('div#Participants video');
                    for(let i=0; i<user.length; i++)
                    {
                        user[i].parentElement.className = 'App-Col' + this.state.columnNum;
                    }

                    // Remove empty component after leave meeting
                    var empty = document.querySelectorAll('div#Participants');
                    for(let index=0; index<empty.length; index++)
                    {
                        if(empty[index].innerHTML === "")
                        {
                            empty[index].remove();
                        }
                    }
                }
            });

            /** Get participant was in room */
            participant.on('trackSubscribed', track => {
                this.setState({
                    columnNum : parseInt(1) + parseInt(this.state.currentRoom.participants.size),
                    isConnected: true,
                });

                const participants = document.createElement('div');
                participants.setAttribute(`id`, `Participants`);
                participants.appendChild(track.attach());
                this.videoconference.current.appendChild(participants);

                var user = document.querySelectorAll('div#Participants video');
                for(let i=0; i<user.length; i++)
                {
                    user[i].parentElement.className = 'App-Col' + this.state.columnNum;
                }

                // Remove empty component after leave meeting
                var empty = document.querySelectorAll('div#Participants');
                for(let index=0; index<empty.length; index++)
                {
                    if(empty[index].innerHTML === "")
                    {
                        empty[index].remove();
                    }
                }

            });
            
            /** Handle video disable */
            participant.on('trackDisabled', track => {
                console.log(track)
                console.log(participant.identity + " Disabled Video");
            });

            /** Handle video enable */
            participant.on('trackEnabled', track => {
                console.log(track)
                console.log(participant.identity + " Enable Video");
            });
        });

    }

    handleParticipantDisconnect() {
        this.state.currentRoom.on('disconnected', () => {
            setTimeout(() => {
                this.setState({ leftRoom: true });
            }, 5000);
        });

        // Detach all participant’s track when they leave a room.
        this.state.currentRoom.on('participantDisconnected', participant => {
            console.log("Participant '" + participant.identity + "' left the room");
            this.setState({
                columnNum : parseInt(1) + parseInt(this.state.currentRoom.participants.size),
            });

            var user = document.querySelectorAll('div#Participants video');
            for(let i=0; i<user.length; i++)
            {
                user[i].parentElement.className = 'App-Col' + this.state.columnNum;
            }

            // Remove empty component after leave meeting
            var empty = document.querySelectorAll('div#Participants');
            for(let index=0; index<empty.length; index++)
            {
                if(empty[index].innerHTML === "")
                {
                    empty[index].remove();
                }
            }

            this.detachParticipantTracks(participant);
        });
    }

    handleTrackDisabled(track) {
        track.on('disabled', () => {
            console.log(track);
        });
    }

    detachTracks(tracks) {
        tracks.forEach(track => {
          track.detach().forEach(detachedElement => {
            detachedElement.remove();
          });
        });
    }
    
    detachParticipantTracks(participant) {
      var tracks = Array.from(participant.tracks.values());
      this.detachTracks(tracks);
    }

    handleDisconnect() {
        // To disconnect from a Room
        this.setState({ isConnected: false, isLeafingRoom: true });

        this.state.currentRoom.disconnect();    
        this.detachParticipantTracks(this.state.currentRoom.localParticipant);
        this.handleStopTrack();

    }

    handleMuteAudio() {
        this.setState({ myVoiceMuted: true });
        this.state.currentRoom.localParticipant.audioTracks.forEach(publication => {
            publication.disable();
        });
    }

    handleunMuteAudio() {
        this.setState({ myVoiceMuted: false });
        this.state.currentRoom.localParticipant.audioTracks.forEach(publication => {
            publication.enable();
        });
    }

    handleMuteVideo() {
        this.setState({ myVideoMuted: true });
        this.state.currentRoom.localParticipant.videoTracks.forEach(publication => {
            publication.disable();
        });
    }

    handleunMuteVideo() {
        this.setState({ myVideoMuted: false });
        this.state.currentRoom.localParticipant.videoTracks.forEach(publication => {
            publication.enable();
        });

        // createLocalVideoTrack().then(localVideoTrack => {
        //     return this.state.currentRoom.localParticipant.publishTrack(localVideoTrack);
        // }).then(publication => {
        //     // publication.track.publish();
        //     publication.track.enable();
        //     console.log('Successfully unmuted your video:', publication);
        // });
    }

    handleStopTrack() {
        this.state.currentRoom.localParticipant.tracks.forEach(track => {
            track.stop();
        })
    }

    // async handleShareScreen() {
    //     const stream = await navigator.mediaDevices.getDisplayMedia();
    //     const screenTrack = new LocalVideoTrack(stream.getTracks()[0]);

    //     this.setState({ shareScreen: screenTrack });
    //     this.state.currentRoom.localParticipant.publishTrack(screenTrack);
    // }

    render() {

        const { classes } = this.props;

        if (this.state.leftRoom === true) {
            return <Redirect to="/" />
        }

        return(
            this.state.isConnected ?
                <Container container disableGutters={false} maxWidth={'xl'} className="App-Container">
                    <Grid container>
                        <div className={`App-VideoLocal`} ref={this.videoconference}></div>

                        {/* {this.state.isParticipantConnected ?
                            <Grid item xs={12} sm={12} md={4} className="App-VideoParticipant" ref={this.participantconference}></Grid>
                        : null } */}

                    </Grid>
                    <Grid>
                        <BottomNavigation
                            showLabels
                            className="App-BottomNav"
                        >
                            {this.state.myVoiceMuted ?
                                <BottomNavigationAction label="Unmute Audio" icon={<MicOff />} className="App-BottomNavItem" onClick={() => this.handleunMuteAudio()}/>
                            :
                                <BottomNavigationAction label="Mute Audio" icon={<Mic />} className="App-BottomNavItem" onClick={() => this.handleMuteAudio()}/>
                            }

                            {this.state.myVideoMuted ?
                                <BottomNavigationAction label="Unmute Video" icon={<VideocamOff />} className="App-BottomNavItem" onClick={() => this.handleunMuteVideo()} />
                            :
                                <BottomNavigationAction label="Mute Video" icon={<Videocam />} className="App-BottomNavItem" onClick={() => this.handleMuteVideo()} />
                            }

                            {/* <BottomNavigationAction label="Share Screen" icon={<ScreenShare />} className="App-BottomNavItem" /> */}
                            {/* <BottomNavigationAction label="Left Meeting" className="App-BottomNavItem" onClick={() => this.handleDisconnect()}/> */}
                        </BottomNavigation>
                    </Grid>
                </Container>
            :
                <Container container disableGutters={false} maxWidth={'xl'} className={classes.container}>
                    <Grid container  className={classes.waiting}>
                        <Typography variant="h5" component="h5" style={{ textAlign: 'center' }}>
                            <Typical
                            steps={['', 1000, this.state.isLeafingRoom ? 'Ending Room...!' : 'Connecting...!', 500]}
                            loop={Infinity}
                            wrapper="p"
                            />
                        </Typography>
                        {this.state.isLeafingRoom ?
                            <Typography variant="h6" component="h6" style={{ textAlign: 'center' }}>Please wait until you have successfully ended the meeting</Typography>
                        :
                            <Typography variant="h6" component="h6" style={{ textAlign: 'center' }}>Please wait until you have successfully joined the meeting</Typography>
                        }
                    </Grid>
                </Container>
        )
    }
}


const useStyles = theme => ({
    root: {
       flexGrow: 1,
    },
    container: {
        padding: 10
    },
    waiting: {
        display: 'flex',
        height: '100vh',
        flexDirection: 'column',
        justifyContent: 'center',
        alignContent: 'center'
    }
});


export default withStyles(useStyles)(Rooms);
