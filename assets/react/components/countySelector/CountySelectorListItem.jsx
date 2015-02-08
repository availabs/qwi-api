var CountySelectorListItem = React.createClass ({

    
  handleClick: function () {
    this.props.notifySelectionChange(this.props.fipsCode);
  },


  render: function () {
    return (
      <li onClick={this.handleClick} 
          className={'countySelectorListItem ' + (this.props.selected ? 'selected' : '')} 
          key={this.props.key} 
          fipsCode={this.props.fipsCode}> 

            {this.props.countyName}

      </li>
    );
  }

});
