import React, { Component } from 'react';
import { Button } from 'react-bootstrap';

class Encrypt extends Component {
  constructor(props){
    super(props);
    this.state = {
      crypt: "Encrypt",
      plainText: "",
      key: "",
      cipherText: ""
    }
    this.handleRadio = this.handleRadio.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.CCencrypt = this.CCencrypt.bind(this);
    this.CCdecrypt = this.CCdecrypt.bind(this);
  }

  handleRadio(value){
    this.setState({
      crypt: value
    });
  }

  handleChange(value,e){
    const eventTarget = e.target.value;
    this.setState({
      [value]: eventTarget
    })
    console.log(eventTarget);
  }

  CCencrypt(){
    var arr = [];
    var key = Number(this.state.key);
    var plain = this.state.plainText;

    for (var i = 0; i < plain.length; i++) {
      if (plain.charCodeAt(i) >= 48 && plain.charCodeAt(i) <= 57) {
        if (plain.charCodeAt(i) + (key % 10) > 57) {
          let temp = plain.charCodeAt(i) + (key % 10) - 10;
          arr.push(temp);
        } else {
          arr.push(plain.charCodeAt(i) + (key % 10));
        }
      } else if (plain.charCodeAt(i) >= 65 && plain.charCodeAt(i) <= 90) {
        if (plain.charCodeAt(i) + (key % 26) > 90) {
          let temp = plain.charCodeAt(i) + (key % 26) - 26;
          arr.push(temp);
        } else {
          arr.push(plain.charCodeAt(i) + (key % 26));
        }
      } else if (plain.charCodeAt(i) >= 97 && plain.charCodeAt(i) <= 122) {
        if (plain.charCodeAt(i) + (key % 26) > 122) {
          let temp = plain.charCodeAt(i) + (key % 26) - 26;
          arr.push(temp);
        } else {
          arr.push(plain.charCodeAt(i) + (key % 26));
        }
      } else {
        arr.push(plain.charCodeAt(i));
      }
    }

    for (var j = 0; j < arr.length; j++) {
      let temp = String.fromCodePoint(arr[j]);
      arr.splice(j,1,temp);
    }

    var cipher = arr.join("");
    this.setState({
      cipherText: cipher
    });
  }

  CCdecrypt(){
    var arr = [];
    var key = Number(this.state.key) % 122;
    var cipher = this.state.cipherText;

    for (var i = 0; i < cipher.length; i++) {
      if (cipher.charCodeAt(i) >= 48 && cipher.charCodeAt(i) <= 57) {
        if (cipher.charCodeAt(i) - (key % 10) < 48) {
          let temp = cipher.charCodeAt(i) - (key % 10) + 10;
          arr.push(temp);
        } else {
          arr.push(cipher.charCodeAt(i) - (key % 10));
        }
      } else if (cipher.charCodeAt(i) >= 65 && cipher.charCodeAt(i) <= 90) {
        if (cipher.charCodeAt(i) - (key % 26) < 65) {
          let temp = cipher.charCodeAt(i) - (key % 26) + 26;
          arr.push(temp);
        } else {
          arr.push(cipher.charCodeAt(i) - (key % 26));
        }
      } else if (cipher.charCodeAt(i) >= 97 && cipher.charCodeAt(i) <= 122) {
        if (cipher.charCodeAt(i) - (key % 26) < 97) {
          let temp = cipher.charCodeAt(i) - (key % 26) + 26;
          arr.push(temp);
        } else {
          arr.push(cipher.charCodeAt(i) - (key % 26));
        }
      } else {
        arr.push(cipher.charCodeAt(i));
      }
    }

    for (var j = 0; j < arr.length; j++) {
      let temp = String.fromCodePoint(arr[j]);
      arr.splice(j,1,temp);
    }

    var plain = arr.join("");
    this.setState({
      plainText: plain
    });
  }

  render(){
    return(
      <div>
        <input
          type="radio"
          name="crypt"
          value="Encrypt"
          onChange={e => this.handleRadio("Encrypt",e)}
          id="Encrypt"
          defaultChecked
        />
        <label htmlFor="Encrypt">Encrypt</label>
        <input
          type="radio"
          name="crypt"
          value="Decrypt"
          onChange={e => this.handleRadio("Decrypt",e)}
          id="Decrypt"
        />
        <label htmlFor="Decrypt">Decrypt</label>
        <br />
        { this.state.crypt === "Encrypt" ? (
          <input
            type="text"
            placeholder="Plain Text"
            value={this.state.plainText}
            onChange={e => this.handleChange("plainText",e)}
          />
        ):(
          <input
            type="text"
            placeholder="Cipher Text"
            value={this.state.cipherText}
            onChange={e => this.handleChange("cipherText",e)}
          />
        )}
        <input
          type="number"
          placeholder="Key"
          value={this.state.key}
          onChange={e => this.handleChange("key",e)}
        />
        { this.state.crypt === "Encrypt" ? (
          <>
            <Button onClick={this.CCencrypt}>{this.state.crypt}</Button>
            <p>Cipher Text: {this.state.cipherText}</p>
          </>
        ):(
          <>
            <button onClick={this.CCdecrypt}>{this.state.crypt}</button>
            <p>Plain Text: {this.state.plainText}</p>
          </>
        )}
      </div>
    );
  }
}

export default Encrypt;
