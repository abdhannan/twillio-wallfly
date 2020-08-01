// this.state.isConnected ?
//         <Container container disableGutters={false} maxWidth={'xl'} className={classes.container}>
//                 <Grid container>
//                     {this.state.participants.map((item) => 
//                         <Grid item xs={12} md={4}>
//                             {item.isVideoMuted ?
//                                 <Card className={classes.area}>
//                                     <CardMedia
//                                         className={classes.media}
//                                         image="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80"
//                                         title={item.name}
//                                         component="div"
//                                         ref={this.videoconference}
//                                     >
//                                     </CardMedia>
//                                     <CardContent style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', paddingBottom: 10 }}>
//                                         <Typography gutterBottom variant="subtitle1" component="p" className={classes.participant_name}>
//                                             {item.name}

//                                             {item.name == "Username 1" ?
//                                                 <Badge className={classes.badge}>YOU</Badge>
//                                             : null }
//                                         </Typography>
                                        
//                                         <ButtonGroup
//                                             orientation="horizontal"
//                                             color="primary"
//                                             className={classes.buttonGroup}
//                                         >
//                                             <IconButton color="primary" component="span">
//                                                 {item.isVoiceMuted ?
//                                                     <MicOff className={classes.control} />
//                                                 :
//                                                     <Mic className={classes.control} />
//                                                 }
//                                             </IconButton>
//                                             <IconButton color="primary" component="span">
//                                                 {item.isVideoMuted ?
//                                                     <VideocamOff color="secondary" className={classes.control} />
//                                                 :
//                                                     <Videocam className={classes.control} />
//                                                 }
//                                             </IconButton>
//                                         </ButtonGroup>
//                                     </CardContent>
//                                 </Card>
//                             :
//                                 <Card className={classes.area}>
//                                     <CardMedia
//                                         className={classes.media}
//                                         // image="https://images.unsplash.com/photo-1513384312027-9fa69a360337?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1051&q=80"
//                                         title={item.name}
//                                         component="div"
//                                         ref={this.videoconference}
//                                     >
//                                     </CardMedia>
//                                     <CardContent style={{ marginTop: -70, paddingBottom: 0 }}>
//                                         <Grid container style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', paddingBottom: 5 }}>
//                                             <Typography gutterBottom variant="subtitle1" component="p" className={classes.participant_name}>
//                                                 {item.name}

//                                                 {item.name == "Username 1" ?
//                                                     <Badge className={classes.badge}>YOU</Badge>
//                                                 : null }
//                                             </Typography>
                                            
//                                             <ButtonGroup
//                                                 orientation="horizontal"
//                                                 color="primary"
//                                                 className={classes.buttonGroup}
//                                             >
//                                                 <IconButton color="primary" component="span">
//                                                     {item.isVoiceMuted ?
//                                                         <MicOff className={classes.control} />
//                                                     :
//                                                         <Mic className={classes.control} />
//                                                     }
//                                                 </IconButton>
//                                                 <IconButton color="primary" component="span">
//                                                     {item.isVideoMuted ?
//                                                         <VideocamOff color="secondary" className={classes.control} />
//                                                     :
//                                                         <Videocam className={classes.control} />
//                                                     }
//                                                 </IconButton>
//                                             </ButtonGroup>
//                                         </Grid>
//                                     </CardContent>
//                                 </Card>
//                             }
//                         </Grid>
//                     )}
//                 </Grid>
                
//                 <Grid container className={this.state.screenWidth > 900 ? classes.fixBottom : ""}>
//                     <Grid container className={classes.centered}>
//                         <Button sizeSmall variant="contained" color="primary" className={classes.buttonFill} component="span" onClick={() => this.setState({ myVoiceMuted: !this.state.myVoiceMuted })}>
//                             {this.state.myVoiceMuted ?
//                                 <MicOff style={{ color: 'white' }}/>
//                             :
//                                 <Mic style={{ color: 'white' }}/>
//                             }
//                         </Button>
//                         <Button variant="contained" color="primary" className={classes.buttonFill} component="span" onClick={() => this.setState({ myVideoMuted: !this.state.myVideoMuted })}>
//                             {this.state.myVideoMuted ?
//                                 <VideocamOff style={{ color: 'white' }} />
//                             :
//                                 <Videocam style={{ color: 'white' }} />
//                             }
//                         </Button>
//                         <Button variant="contained" color="primary" className={classes.buttonFill} component="span">
//                             <Album style={{ color: 'white' }} />
//                         </Button>
//                         <Button variant="contained" color="secondary" className={classes.buttonFill} component="span">
//                             <Typography variant="body1" component="p">End Meeting</Typography>
//                         </Button>
//                     </Grid>
//                 </Grid>
//         </Container>
//     :
//         <Container container disableGutters={false} maxWidth={'xl'} className={classes.container}>
//             <Grid container  className={classes.waiting}>
//                 <Typography variant="h5" component="h5" style={{ textAlign: 'center' }}>
//                     <Typical
//                         steps={['', 1000, this.state.isConnected ? 'Ending Room...!' : 'Connecting...!', 500]}
//                         loop={Infinity}
//                         wrapper="p"
//                     />
//                 </Typography>
//                 <Typography variant="h6" component="h6" style={{ textAlign: 'center' }}>Please wait until you have successfully joined the meeting</Typography>
//             </Grid>
//         </Container>