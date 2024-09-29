import { Box, Button, TextField, Typography } from "@mui/material"
import { useState } from "react"


const Chat = () => {
  
  const [chatMessage, setChatMessage] = useState<string>("")
  const [jobId, setJobId] = useState<string>("")
  const [jobIds, setJobIds] = useState<string[]>([])

  const sendChat = async () => {
    const data = await fetch("/api/chat/startjob", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        chat: chatMessage
      })
    })
    if (!data.ok) {
      console.error("Error starting chat job")
      return
    }
    const json = await data.json()
    if (!("id" in json)) {
      console.error("Error starting chat job")
      return
    }
    alert(`Chat job started: ${json.id}`)
    setJobIds([...jobIds, json.id])
  }

  const pollJob = async () => {
    const data = await fetch(`/api/chat/poll?job_id=${jobId}`, {
      method: "GET",
    })
    if (!data.ok) {
      console.error("Error polling chat job")
      return
    }
    const json = await data.json()
    if (!("status" in json)) {
      console.error("Error polling chat job")
      return
    }
    console.log(json.status)
  }

  return <Box
    display="flex"
    flexDirection="column"
    alignItems="center"
    justifyContent="center"
    width="100%"
  >
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      width="256px"
    >
      <h1>Chat</h1>

      <Typography>{jobIds.join(",")}</Typography>

      <TextField
        label="Message"
        value={chatMessage}
        onChange={(e) => setChatMessage(e.target.value)}
      />
      <Button
        variant="contained"
        onClick={sendChat}
      >
        Ask
      </Button>
      <TextField
        label="JobId"
        value={jobId}
        onChange={(e) => setJobId(e.target.value)}
      />
      <Button
        variant="contained"
        onClick={pollJob}
      >Poll job</Button>
    </Box>
  </Box>
}

export default Chat