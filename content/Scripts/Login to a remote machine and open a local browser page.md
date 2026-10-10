This command opens a remote connection to the designated IP address and allows a user to open a port that is only published locally

```sh
ssh -N -L 127.0.0.1:20080:127.0.0.1:20080 tqbit@<ip-address>
```